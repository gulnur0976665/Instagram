import { FC } from "react";
import Reset from "./ResetSections/Reset";

interface ResetPageProps {
  token: string | null;
}

const ResetPage: FC<ResetPageProps> = ({ token }) => {
  return <Reset token={token} />;
};

export default ResetPage;
