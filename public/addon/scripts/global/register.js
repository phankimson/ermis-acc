var Register = function () {
    jQuery('input[name="username"],input[name="password"]').keypress(function (e) {
        if (e.which === 13) {
            btnLogin(e);
            return false;    //<---- Add this line
        }
    });

    var btnLogin = function (e) {
          ErmisTemplateAjaxPost1(e,'.login-form','register',
          function(result){
              window.location.href = 'index';
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
            jQuery('#button_register').on('click ', btnLogin);
            initKendoUiDropList();
        }

    };

}();

jQuery(document).ready(function () {
    Register.init();
});
