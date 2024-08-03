export interface Data {
  id: number;
  name: string; 
  description: string;
  icono: string;
  status_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: number;  // Agrega esta línea
}
