$(() => {
    $('[data-toggle="tooltip"]').tooltip()
})

$(() => {
    $("#modalContactFormSubmit").on("click", (e) => {
        e.preventDefault();
        if (validateContactForm()) {

            formData = {
                'name': $('input[name=name]').val(),
                'email': $('input[name=email]').val(),
                'message': $('textarea[name=message]').val()
            };

            $.ajax({
                url: "/contact",
                type: "POST",
                data: formData,
                success: (data) => {
                    $("#modalContactForm").modal("hide");
                    alert('Success!');
                },
                fail: (data) => {
                    alert('Error!');
                }
            });
        }

    });
});

function validateContactForm() {
    return $("#name").val() && $("#email").val() && validateEmail($("#email").val()) && $("#message").val();
}

function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}