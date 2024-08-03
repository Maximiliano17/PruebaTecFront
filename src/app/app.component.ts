import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service'; // Ajusta la ruta si es necesario
import { Data } from './models/data.model'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nombre-proyecto';
  data: Data[] = [];
  newData: any = {
    name: '',
    description: '',
    icono: '',
    filesToUpload: null,
    nameFolder: 'type_payment_conditions'
  };
  editData: any = {
    name: '',
    description: '',
    icono: '',
    status_id: 1
  };
  viewingData: any = {
    id: null,
    name: '',
    description: '',
    icono: '',
    status_id: 1,
    created_at: '',
    updated_at: '',
    deleted_at: ''
  };
  editingId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData();
    this.initModals(); // Asegúrate de inicializar ambas modals
  }

  getData(): void {
    this.apiService.getData().subscribe(
      (response) => {
        this.data = response;
        console.log('Datos recibidos:', this.data); // Verifica los datos recibidos
      },
      (error) => {
        console.error('Error al obtener datos de la API', error);
      }
    );
  }

  getStatusText(status_id: number): string {
    console.log('Tipo de status_id:', typeof status_id, 'Valor de status_id:', status_id);
    return status_id === 1 ? 'Activo' : status_id === 2 ? 'Inactivo' : 'Desconocido';
  }

  onFileChange(event: any): void {
    this.newData.filesToUpload = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.newData.name);
    formData.append('description', this.newData.description);
    formData.append('icono', this.newData.icono);
    formData.append('filesToUpload', this.newData.filesToUpload);
    formData.append('nameFolder', this.newData.nameFolder);

    this.apiService.createPaymentMethod(formData).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        this.closeModal();
        this.resetForm();
        this.getData();
      },
      error => {
        console.error('Error en la solicitud POST', error);
      }
    );
  }

  onUpdate(): void {
    if (this.editingId !== null) {
      const payload = {
        name: this.editData.name,
        description: this.editData.description,
        icono: this.editData.icono,
        status_id: this.editData.status_id,
        filesToUpload: null, // Este campo no se usa en la solicitud PUT
        nameFolder: 'type_payment_conditions' // Este campo no se usa en la solicitud PUT
      };

      this.apiService.updatePaymentMethod(this.editingId, payload).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          this.closeEditModal();
          this.getData();
        },
        error => {
          console.error('Error en la solicitud PUT', error);
        }
      );
    }
  }

  openEditModal(id: number): void {
    this.editingId = id;
    const item = this.data.find(d => d.id === id);
    if (item) {
      this.editData = { ...item };
    }
    const modal = document.getElementById('editModal') as HTMLElement;
    modal.style.display = 'block';
  }

  onView(id: number): void {
    this.apiService.getPaymentMethodDetail(id).subscribe(
      response => {
        this.viewingData = response;
        const modal = document.getElementById('viewModal') as HTMLElement;
        modal.style.display = 'block';
      },
      error => {
        console.error('Error al obtener detalles del método de pago', error);
      }
    );
  }

  onDelete(id: number): void {
    const confirmDelete = window.confirm('¿Deseas eliminar permanentemente el método de pago?');
    if (confirmDelete) {
      this.apiService.deletePaymentMethod(id).subscribe(
        response => {
          console.log('Método de pago eliminado:', response);
          this.getData();
        },
        error => {
          console.error('Error al eliminar el método de pago', error);
        }
      );
    }
  }

  closeModal(): void {
    const modal = document.getElementById('modal') as HTMLElement;
    modal.style.display = 'none';
  }

  closeEditModal(): void {
    const modal = document.getElementById('editModal') as HTMLElement;
    modal.style.display = 'none';
  }

  closeViewModal(): void {
    const modal = document.getElementById('viewModal') as HTMLElement;
    modal.style.display = 'none';
  }

  resetForm(): void {
    this.newData = {
      name: '',
      description: '',
      icono: '',
      filesToUpload: null,
      nameFolder: 'type_payment_conditions'
    };
  }

  initModals(): void {
    const modal = document.getElementById('modal') as HTMLElement;
    const btn = document.querySelector('.MethodPago') as HTMLElement;
    const span = document.querySelector('.close') as HTMLElement;
    const editModal = document.getElementById('editModal') as HTMLElement;
    const closeEditSpan = document.querySelector('.close-edit') as HTMLElement;
    const viewModal = document.getElementById('viewModal') as HTMLElement;
    const closeViewSpan = document.querySelector('.close-view') as HTMLElement;

    if (modal && btn && span) {
      btn.onclick = () => {
        modal.style.display = 'block';
      };

      span.onclick = () => {
        modal.style.display = 'none';
      };

      window.onclick = (event: MouseEvent) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
    }

    if (editModal && closeEditSpan) {
      closeEditSpan.onclick = () => {
        editModal.style.display = 'none';
      };

      window.onclick = (event: MouseEvent) => {
        if (event.target === editModal) {
          editModal.style.display = 'none';
        }
      };
    }

    if (viewModal && closeViewSpan) {
      closeViewSpan.onclick = () => {
        viewModal.style.display = 'none';
      };

      window.onclick = (event: MouseEvent) => {
        if (event.target === viewModal) {
          viewModal.style.display = 'none';
        }
      };
    }
  }
}