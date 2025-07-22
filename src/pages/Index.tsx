import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // إعادة توجيه تلقائية إلى الصفحة الرئيسية
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
