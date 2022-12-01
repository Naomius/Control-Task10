$(document).ready(function () {


//Функция ниже, была у нас в проекте.
document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}
document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

//Егор, немного не додумал с  инпутами и надписью, чтобы они исчезали при заполнении полей, но при этом отправку формы мы не кливаем.

    /*Так же заметил один момент, которые получается при определенных условиях:
    * 1.Если нажимаю отправить не заполненную форму(выдает ошибку валидации, что само собой=)), и после я заполняю полностью поля инпутов и снова нажимаю отправить
    * то запрос не отправляется при клике. Выход из ситуации только самому обновить страницу и псоле этого заполнить инпуты формы и тогда запрос срабатывает.
    * 2.Таже история если отправить запрос и после сделать одно из полей ошибочным, то второй раз запрос уже не отправится.
    * Не знаю смог ли объяснить, текстом сложновато =)
    * Вообщем суть я так понимаю в том, что при ошибочной валидации без обновления страницы он больше не отправляет форму. */

    let loader = $('.loader');
    let order = $('#order-input');
    let name = $('#order-name');
    let tel = $('#order-tel');
    let hasError = false;

    $('[name=quantity]').bind('change keyup input click', function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });



$('#submit').click(function () {

    $(".error").remove();

    if (!order.val().trim()) {
        order.after('<div class="error">Необходимо ввести Заказ </div>');
        order.css('border', '2px solid red');
        hasError = true;
    } else {
        $('#order-input').css('border', '2px solid green');
    }
    if (!name.val().trim()) {
        name.after('<div class="error">Необходимо ввести Имя </div>');
        name.css('border', '2px solid red');
        hasError = true;
    } else {
        $('#order-name').css('border', '2px solid green');
    }
    if (!tel.val().trim()) {
        tel.after('<div class="error">Необходимо ввести Телефон </div>');
        tel.css('border', '2px solid red');
        hasError = true;
    } else {
        $('#order-tel').css('border', '2px solid green');
    }

    if (!hasError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: " https://testologia.site/checkout",
            data: { order: order.val(), name: name.val(), tel: tel.val() }
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {              /*Пункт.4.Не знаю насколько правильно по дизайну сделал вертикальный и горизонтальный текст*/
                    $('#block1').hide();
                    $('#block2').show();

                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            });
    }

});






});