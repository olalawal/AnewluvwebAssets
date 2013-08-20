/* File Created: March 7, 2013 */

(function ($, window, document, utility, ko, kendo, kokendo) {
    //   debugger;
    var $chatArea = null,
        $knockout = null,
        $tabs = null,
        $submitButton = null, $datepicker = null, $monthpicker = null,
        $newMessage = null,
        $toast = null,
        $disconnectDialog = null,
        $downloadIcon = null,
        $downloadDialog = null,
        $downloadDialogButton = null,
        $downloadRange = null,
        $ui = null,
        $window = $(window),
        $document = $(document),
        preferences = null,
        $knockout = null,
        $kendo = null,  //binding for kendo UI
        $kokendo = null; //bding for ko-kendo script that makes kendo and ko intergration easier
   
    var ui = {

        //lets store any events to be triggered as constants here to aid intellisense and avoid
        //string duplication everywhere
        events: {

            profileMemberLoaded: 'profileMemberLoaded',
           /* activeRoomChanged: 'registerfailed',
            scrollRoomTop: 'scrollRoomTop',
            typing: 'typing',
            sendMessage: 'sendMessage',
            focusit: 'focusit',
            blurit: 'blurit',
            preferencesChanged: 'preferencesChanged'*/
        },

        initialize: function (state) {            
            preferences = state || {};
            $ui = $(this);
            $knockout = ko;
            $kendo = kendo;
            $kokendo = kokendo;
            $login = $('.janrainEngage');
            //focus = true;
           /* $submitButton = $('#saveRegBtnContainer input[name="submit"]');
            $datepicker = $("#datepicker");
            $monthpicker = $("#monthpicker");*/


            //setup the stuff for date picker
           // $datepicker.kendoDatePicker();

           // $("#ticket").kendoDropDownList();

            //$('.ui-datepicker').css('font-size', $('.ui-datepicker').width() / 20 + 'px');


            //            $monthpicker.kendoDatePicker({
            //                // defines the start view
            //                start: "year",

            //                // defines when the calendar should return date
            //                depth: "year",

            //                // display month and year in the input
            //                format: "MMMM yyyy"
            //            });


            /*$document.on('click', '#tabs li .close', function (ev) {
                var roomName = $(this).closest('li').data('name');

                $ui.trigger(ui.events.closeRoom, [roomName]);

                ev.preventDefault();
                return false;
            });

            $submitButton.click(function (ev) {
                triggerSend();

                ev.preventDefault();
                return false;
            });*/

        },

        setInitialized: function (roomName) {
          //  var room = roomName ? getRoomElements(roomName) : getCurrentRoomElements();
//            room.setInitialized();
        }

    };

    //sets the window to a variable so it can be used as a plugin
    //window.Anewluv.ui = ui;
    if (!window.Anewluv) {
        window.Anewluv = {};
    }
    window.Anewluv.ui = ui;

//})(jQuery, window, window.document, window.chat.utility, window.ko, window.kendo, window.ko.kendo);
})(jQuery, window, window.document, window.chat.utility, window.ko);