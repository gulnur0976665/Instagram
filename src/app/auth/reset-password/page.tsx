import { GetServerSideProps } from "next";
import ResetPage from "@/components/auth/pages/ReserPage";

interface PageProps {
  token: string | null;
}

const Page = ({ token }: PageProps) => {
  return <ResetPage token={token} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.query.token || null;
  if (!token) {
    return { notFound: true };
  }

  return {
    props: {
      token,
    },
  };
};

export default Page;
