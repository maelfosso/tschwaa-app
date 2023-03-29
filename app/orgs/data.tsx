import { GetServerSideProps } from "next"
// import customAxiosInstance from "../../../utils/axios";

interface Data {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
}

interface DatasProps {
  members: Data[]
}

const Datas = ({ members }: DatasProps) => {
  return (
    <div>
      <h1>Datas</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  console.log('Datas Query : ', query);
  // const data = await customAxiosInstance.get(`orgs/${query.orgId}/members`);
  return {
    props: {
      members: []
    }
  }
}

export default Datas;
