// components/clientDashboard/ClientDashboard.tsx
import Layout from '../../components/clientDashboard/laytout';

const ClientDashboard: React.FC = () => {
  return (
    <Layout>
      <div>
        {/* This is where your result cards or other dashboard content will go */}
        <h2 className='text-red-600'>Sizning Natijalaringiz</h2>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
