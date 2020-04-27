$(document).ready(() => {
    $('#reminders').DataTable({
        responsive: true,
        "pageLength": 10
    });
});

$('#confirm-delete').on('show.bs.modal', (e) => {
    var symbol = $(e.relatedTarget).data('symbol');
    $('#body-text').text('Are you sure you want to delete this reminder: ' + symbol + '?');
    $('.btn-ok').attr('href', '/admin/reminder/' + symbol + '/delete');
});