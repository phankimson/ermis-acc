var ErmisTemplateAjaxPost1 = function (e , elem , url , callback_true , callback_false) {
  e.preventDefault();
  var data = GetAllValueForm(elem);
  var postdata = { data: JSON.stringify(data) };
  RequestURLWaiting(url, 'json', postdata, function (result) {
      if (result.status === true) {
          callback_true(result);
      } else {
          callback_false(result);
      }
  }, true);
};

var ErmisKendoEditorFullTemplate = function(elem){
    jQuery(elem).kendoEditor({
      tools: [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "justifyLeft",
          "justifyCenter",
          "justifyRight",
          "justifyFull",
          "insertUnorderedList",
          "insertOrderedList",
          "indent",
          "outdent",
          "createLink",
          "unlink",
          "insertImage",
          "insertFile",
          "subscript",
          "superscript",
          "tableWizard",
          "createTable",
          "addRowAbove",
          "addRowBelow",
          "addColumnLeft",
          "addColumnRight",
          "deleteRow",
          "deleteColumn",
          "viewHtml",
          "formatting",
          "cleanFormatting",
          "fontName",
          "fontSize",
          "foreColor",
          "backColor",
          "print"
      ]
  });
}

var ErmisKendoButtonTemplate = function(elem,icon){
  jQuery(elem).kendoButton({
       icon: icon
   });
}

var ErmisKendoWindowTemplate = function(elem,$width,$title){
  var window = elem.kendoWindow({
     width: $width,
     title: $title,
     visible: false,
     actions: [
         "Pin",
         "Minimize",
         "Maximize",
         "Close"
     ],
     modal: true
 }).data("kendoWindow").center();
 return window
}

var ErmisKendoComboboxTemplate = function(elem,text,value,filter,data){
  jQuery(elem).kendoComboBox({
          dataTextField: text,
          dataValueField: value,
          filter: filter,
          dataSource: data
  });
}
