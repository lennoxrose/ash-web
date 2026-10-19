import CopyCommand from "./copy";
import { INSTALL_CMD } from "./site";

export const InstallBar = ({ label, note }: { label?: string; note?: boolean }) => (
  <div className="install">
    {label && <p className="lbl">{label}</p>}
    <CopyCommand command={INSTALL_CMD} />
    {note && <p className="note">Read the script first: <a href="/install.sh">ash-project.org/install.sh</a></p>}
  </div>
);
