var Login = function () {
    jQuery('input[name="username"],input[name="password"]').keypress(function (e) {
        if (e.which === 13) {
            btnLogin(e);
            return false;    //<---- Add this line
        }
    });

    var btnLogin = function (e) {
        ErmisTemplateAjaxPost1(e,'.login-form','login',
        function(){
            window.location.href = 'index';
        },
        function(result){
            jQuery('#notification').EPosMessage('error', result.message);
        }
      );
    };
    var btnEmail = function (e) {
        ErmisTemplateAjaxPost1(e,'.forget-form','email/reset',
        function(result){
            jQuery('#notification').EPosMessage('success', result.message);
        },
        function(result){
            jQuery('#notification').EPosMessage('error', result.message);
        }
      );
    };
    var initKendoUiDropList = function () {
        jQuery(".droplist").kendoDropDownList({
            filter: "contains"
        });
    };

    return {

        init: function () {
            jQuery('#button_login').on('click ', btnLogin);
            jQuery('#button_email').on('click ', btnEmail);
            initKendoUiDropList();
        }

    };

}();

jQuery(document).ready(function () {
    Login.init();
});
