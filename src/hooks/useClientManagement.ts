import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Client {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone?: string;
  employees: number;
  plan: 'basic' | 'professional' | 'enterprise' | 'enterprise+';
  status: 'active' | 'suspended' | 'pending' | 'trial';
  industry?: string;
  monthly_revenue: number;
  join_date: string;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface NewClient {
  name: string;
  contact_person: string;
  email: string;
  phone?: string;
  employees: number;
  plan: 'basic' | 'professional' | 'enterprise' | 'enterprise+';
  industry?: string;
  monthly_revenue: number;
}

export const useClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clients:', error);
        setError(error.message);
        toast.error('فشل في تحميل بيانات العملاء');
        return;
      }

      const mappedClients: Client[] = (data || []).map(client => ({
        id: client.id,
        name: client.name,
        contact_person: client.contact_person,
        email: client.email,
        phone: client.phone,
        employees: client.employees || 0,
        plan: client.plan as Client['plan'],
        status: client.status as Client['status'],
        industry: client.industry,
        monthly_revenue: Number(client.monthly_revenue) || 0,
        join_date: client.join_date || client.created_at.split('T')[0],
        last_login: client.last_login,
        created_at: client.created_at,
        updated_at: client.updated_at
      }));

      setClients(mappedClients);
    } catch (error) {
      console.error('Unexpected error fetching clients:', error);
      setError('حدث خطأ غير متوقع');
      toast.error('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  const addClient = async (clientData: NewClient): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([{
          name: clientData.name,
          contact_person: clientData.contact_person,
          email: clientData.email,
          phone: clientData.phone,
          employees: clientData.employees,
          plan: clientData.plan,
          industry: clientData.industry,
          monthly_revenue: clientData.monthly_revenue,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding client:', error);
        toast.error('فشل في إضافة العميل');
        return false;
      }

      toast.success('تم إضافة العميل بنجاح');
      await fetchClients(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Unexpected error adding client:', error);
      toast.error('حدث خطأ غير متوقع');
      return false;
    }
  };

  const updateClient = async (clientId: string, updates: Partial<Client>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', clientId);

      if (error) {
        console.error('Error updating client:', error);
        toast.error('فشل في تحديث بيانات العميل');
        return false;
      }

      toast.success('تم تحديث بيانات العميل بنجاح');
      await fetchClients(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Unexpected error updating client:', error);
      toast.error('حدث خطأ غير متوقع');
      return false;
    }
  };

  const deleteClient = async (clientId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientId);

      if (error) {
        console.error('Error deleting client:', error);
        toast.error('فشل في حذف العميل');
        return false;
      }

      toast.success('تم حذف العميل بنجاح');
      await fetchClients(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Unexpected error deleting client:', error);
      toast.error('حدث خطأ غير متوقع');
      return false;
    }
  };

  const suspendClient = async (clientId: string): Promise<boolean> => {
    return updateClient(clientId, { status: 'suspended' });
  };

  const activateClient = async (clientId: string): Promise<boolean> => {
    return updateClient(clientId, { status: 'active' });
  };

  const updateLastLogin = async (clientId: string): Promise<void> => {
    try {
      await supabase
        .from('clients')
        .update({ last_login: new Date().toISOString() })
        .eq('id', clientId);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    isLoading,
    error,
    addClient,
    updateClient,
    deleteClient,
    suspendClient,
    activateClient,
    updateLastLogin,
    refetch: fetchClients
  };
};