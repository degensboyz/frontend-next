import Swal from "sweetalert2";

export const swal = Swal.mixin({
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
});

export const toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});
