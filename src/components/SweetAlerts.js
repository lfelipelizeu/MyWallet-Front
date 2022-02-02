import Swal from 'sweetalert2';

export function ErrorAlert(message) {
    Swal.fire({
        title: message,
        icon: 'error',
        confirmButtonText: 'Ok',
    });
}

export function SuccessAlert(message) {
    Swal.fire({
        title: message,
        icon: 'success',
        confirmButtonText: 'Ok',
    });
}

export async function ConfirmAlert(message) {
    return await Swal.fire({
        title: message,
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
    });
}
