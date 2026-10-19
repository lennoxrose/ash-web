#!/bin/sh
# Ash installer
#
#   curl -fsSL https://ash-project.org/install.sh | sh
#
# Installs the latest Ash release (ashvm, kiln, apm) into ~/.ash. No sudo.
# The SHA256 checksum from the release is verified before anything is installed.
# Source: https://github.com/lennoxrose/ash-web/blob/main/install/install.sh
#
# Options: --version <tag>   install a specific release tag
#          --no-modify-path  never touch your shell config
#          --uninstall       remove ~/.ash and the PATH line this script added
#          --help            show this help

set -eu

REPO="lennoxrose/ash"
ASH_DIR="$HOME/.ash"
MARK="# added by the Ash installer"
# Platforms that have a real release asset: ash-<os>-<arch>.tar.gz
SUPPORTED="linux-x86_64"

say() { printf '%s\n' "$*"; }
step() { printf '==> %s\n' "$*"; }
warn() { printf 'warning: %s\n' "$*" >&2; }
die() { printf 'error: %s\n' "$*" >&2; exit 1; }
have() { command -v "$1" >/dev/null 2>&1; }

logo() {
  cat <<'EOF'

       ##%%
     ####%%%%
   ######%%%%%%
  ***####%%%%###
   *****####%%
     ====*****
      ===***
       ==*

  Ash: A Java-like language, built from scratch in C.

EOF
}

usage() {
  cat <<'EOF'
Usage: install.sh [--version <tag>] [--no-modify-path] [--uninstall] [--help]

  --version <tag>   install a specific release tag instead of the latest
  --no-modify-path  never edit your shell config; just print the PATH line
  --uninstall       remove ~/.ash and the PATH line this installer added
  --help            show this help
EOF
}

# Shell config used for the PATH line (RC is empty for shells we do not know).
shell_setup() {
  # shellcheck disable=SC2016 # the lines are written to the rc file literally; $HOME expands there
  LINE='export PATH="$HOME/.ash/bin:$PATH"'
  case "${SHELL:-}" in
    */bash) RC="$HOME/.bashrc" ;;
    */zsh) RC="${ZDOTDIR:-$HOME}/.zshrc" ;;
    */fish)
      RC="$HOME/.config/fish/config.fish"
      # shellcheck disable=SC2016
      LINE='set -gx PATH "$HOME/.ash/bin" $PATH'
      ;;
    *) RC="" ;;
  esac
}

# Ask a yes/no question on the terminal, even when the script itself is piped in.
ask() {
  if ( : </dev/tty ) 2>/dev/null; then
    printf '%s [y/N] ' "$1" >/dev/tty
    read -r ans </dev/tty || return 1
    case "$ans" in y | Y | yes | YES) return 0 ;; esac
  fi
  return 1
}

unsupported() {
  warn "no prebuilt Ash release for $1 ($2)"
  cat >&2 <<'EOF'

Build it from source instead:

  git clone https://github.com/lennoxrose/ash.git && cd ash
  tools/install.sh
  make
EOF
  exit 1
}

fetch() { # url dest
  if have curl; then
    curl -fsSL "$1" -o "$2" || die "download failed: $1"
  elif have wget; then
    wget -q -O "$2" "$1" || die "download failed: $1"
  else
    die "curl or wget is required"
  fi
}

sha256_of() {
  if have sha256sum; then
    sha256sum "$1" | awk '{print $1}'
  elif have shasum; then
    shasum -a 256 "$1" | awk '{print $1}'
  else
    die "sha256sum or shasum is required to verify the download"
  fi
}

detect_platform() {
  os=$(uname -s | tr '[:upper:]' '[:lower:]')
  arch=$(uname -m)
  case "$arch" in
    amd64) arch=x86_64 ;;
    arm64) arch=aarch64 ;;
  esac
  PLATFORM="$os-$arch"
  case " $SUPPORTED " in
    *" $PLATFORM "*) ;;
    *) unsupported "$PLATFORM" "supported: $SUPPORTED" ;;
  esac
  if [ "$os" = linux ] && [ ! -e /lib64/ld-linux-x86-64.so.2 ]; then
    unsupported "$PLATFORM without glibc" "the release binaries need glibc (not musl/Alpine)"
  fi
}

on_path() {
  case ":$PATH:" in
    *":$ASH_DIR/bin:"*) return 0 ;;
  esac
  return 1
}

setup_path() {
  hint="Add this line to your shell config to use Ash:

  $LINE"
  if [ "$MODIFY_PATH" = 0 ]; then
    say "$hint"
    return
  fi
  if on_path; then return; fi
  if [ -z "$RC" ]; then
    say "$hint"
  elif [ -f "$RC" ] && grep -qF "$LINE" "$RC"; then
    say "PATH is already set up in $RC (open a new terminal to pick it up)."
  elif ask "Add $ASH_DIR/bin to your PATH in $RC?"; then
    mkdir -p "$(dirname "$RC")"
    printf '\n%s\n%s\n' "$MARK" "$LINE" >>"$RC"
    step "Added $ASH_DIR/bin to PATH in $RC (open a new terminal to pick it up)"
  else
    say "$hint"
  fi
}

uninstall() {
  shell_setup
  step "Removing $ASH_DIR"
  if [ -e "$ASH_DIR" ]; then rm -rf "$ASH_DIR"; else say "  not found, nothing to remove"; fi
  for rc in "$HOME/.bashrc" "${ZDOTDIR:-$HOME}/.zshrc" "$HOME/.config/fish/config.fish"; do
    if [ -f "$rc" ] && grep -qF "$MARK" "$rc"; then
      t=$(mktemp)
      awk -v m="$MARK" '$0 == m { skip = 1; next } skip { skip = 0; if ($0 ~ /\.ash\/bin/) next } { print }' "$rc" >"$t"
      cat "$t" >"$rc"
      rm -f "$t"
      step "Removed the PATH line from $rc"
    fi
  done
  say "Ash is uninstalled."
}

install() {
  logo
  detect_platform
  asset="ash-$PLATFORM.tar.gz"
  if [ -n "$TAG" ]; then
    url="https://github.com/$REPO/releases/download/$TAG"
  else
    url="https://github.com/$REPO/releases/latest/download"
  fi

  tmp=$(mktemp -d)
  trap 'rm -rf "$tmp"' EXIT
  trap 'exit 1' INT TERM HUP

  step "Downloading $asset (${TAG:-latest})"
  fetch "$url/$asset" "$tmp/$asset"
  fetch "$url/SHA256SUMS" "$tmp/SHA256SUMS"

  step "Verifying checksum"
  want=$(awk -v f="$asset" '{ n = $2; sub(/^\*/, "", n) } n == f { print $1; exit }' "$tmp/SHA256SUMS")
  [ -n "$want" ] || die "SHA256SUMS has no entry for $asset"
  got=$(sha256_of "$tmp/$asset")
  [ "$want" = "$got" ] || die "checksum mismatch for $asset (expected $want, got $got). Nothing was installed."
  say "  sha256 $got"

  step "Unpacking"
  if tar -tzf "$tmp/$asset" | grep -qE '^/|(^|/)\.\.(/|$)'; then
    die "archive contains unsafe paths. Nothing was installed."
  fi
  mkdir "$tmp/stage"
  tar -xzf "$tmp/$asset" -C "$tmp/stage"
  for f in bin/ashvm bin/kiln bin/apm VERSION; do
    [ -f "$tmp/stage/$f" ] || die "archive is missing $f. Nothing was installed."
  done
  new=$(cat "$tmp/stage/VERSION")

  if [ -f "$ASH_DIR/VERSION" ]; then
    step "Replacing existing install $(cat "$ASH_DIR/VERSION") with $new"
  else
    step "Installing $new into $ASH_DIR"
  fi
  (cd "$tmp/stage" && find . -type f) | sed 's|^\./||' >"$tmp/files"
  while IFS= read -r f; do
    dest="$ASH_DIR/$f"
    if [ -e "$dest" ]; then say "  replacing $dest"; else say "  installing $dest"; fi
    mkdir -p "$(dirname "$dest")"
    cp -p "$tmp/stage/$f" "$dest.new"
    mv -f "$dest.new" "$dest"
  done <"$tmp/files"

  missing=""
  if have ldd; then
    missing=$(ldd "$ASH_DIR/bin/ashvm" 2>/dev/null | awk '/not found/ { printf "%s ", $1 }')
  fi

  step "Installed Ash $new"
  setup_path
  if [ -n "$missing" ]; then
    warn "ashvm needs shared libraries that are missing on this system: $missing"
    warn "Install them with your package manager, then run: ashvm --help"
  elif on_path; then
    say "Run: ashvm --help"
  else
    say "Run: $ASH_DIR/bin/ashvm --help"
  fi
}

main() {
  TAG=""
  MODIFY_PATH=1
  UNINSTALL=0
  while [ $# -gt 0 ]; do
    case "$1" in
      --version)
        [ $# -ge 2 ] || die "--version needs a release tag, e.g. --version beta-v0.1.0"
        TAG="$2"
        shift
        ;;
      --no-modify-path) MODIFY_PATH=0 ;;
      --uninstall) UNINSTALL=1 ;;
      -h | --help)
        usage
        exit 0
        ;;
      *)
        usage >&2
        die "unknown option: $1"
        ;;
    esac
    shift
  done
  case "$TAG" in
    *[!A-Za-z0-9._-]*) die "invalid release tag: $TAG" ;;
  esac

  if [ "$UNINSTALL" = 1 ]; then
    uninstall
    return
  fi
  shell_setup
  install
}

# Everything runs from main so a truncated download cannot execute half a script.
main "$@"
