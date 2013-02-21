$(document).ready(function () {
    var lstPersons = [];
    var objPerson = {};
    objPerson.name = "Vishal Rajput";
    objPerson.imgurl = "img/Vishal.jpg";
    objPerson.status = "offlinestatus";
    lstPersons.push(objPerson);


    objPerson = {};
    objPerson.name = "Kamlesh Patel";
    objPerson.imgurl = "img/Kamlesh.jpg";
    objPerson.status = "onlinestatus";
    lstPersons.push(objPerson);

    objPerson = {};
    objPerson.name = "Jenilia";
    objPerson.imgurl = "img/Jenilia.jpg";
    objPerson.status = "offlinemobilestatus";
    lstPersons.push(objPerson);

    objPerson = {};
    objPerson.name = "Viral Pandya";
    objPerson.imgurl = "img/Vishal.jpg";
    objPerson.status = "offlinestatus";
    lstPersons.push(objPerson);

    objPerson = {};
    objPerson.name = "Ritesh Deshmukh";
    objPerson.imgurl = "img/Kamlesh.jpg";
    objPerson.status = "onlinestatus";
    lstPersons.push(objPerson);

    objPerson = {};
    objPerson.name = "Katrina Kaif";
    objPerson.imgurl = "img/Jenilia.jpg";
    objPerson.status = "onlinemobilestatus";
    lstPersons.push(objPerson);

    LoadChatBarHTML(lstPersons);


    function LoadChatBarHTML(lstPersons) {
        var TotalOninePerson = 0;
        $.each(lstPersons, function (i, obj) {
            if (obj.status == "onlinestatus" || obj.status == "onlinemobilestatus")
                TotalOninePerson++;
        });

        var strHTML = "";
        strHTML += "<div id='chatminimisedlist' class='chatminimisedlist' style='display: none'>";
        strHTML += "        Chat (" + TotalOninePerson.toString() + ") &nbsp;&nbsp; <img id='imgChatListNotification' style='width:9px;height:9px;' src='img/onlineblink.gif' />";
        strHTML += "    </div>";
        strHTML += "    <div id='Chat'>";
        strHTML += "        <table cellpadding='0' cellspacing='0' class='tblborder'>";
        strHTML += "            <tr>";
        strHTML += "                <td class='tdchatlist'>";
        strHTML += "                    <table id='tblchat'>";
        $.each(lstPersons, function (i, obj) {
            strHTML += "                        <tr id='trchat" + i.toString() + "'>";
            strHTML += "                            <td>";
            strHTML += "                                <a id='lnkPerson" + i.toString() + "' class='personlink' href='#' data-content='<table><tr><td><img width=50 height=50 src=" + obj.imgurl + " /></td><td><B><span>" + obj.name + "</span></B><br/><br/><span>See friendship</span></td></tr></table>'";
            strHTML += "                                    data-placement='left' rel='popover' data-html='true'>";
            strHTML += "                                    <table>";
            strHTML += "                                        <tr>";
            strHTML += "                                            <td class='chtpersonimgcell' id='tdchtpersonimgcell" + i.toString() + "'>";
            strHTML += "                                                <img alt='' src='" + obj.imgurl + "' />";
            strHTML += "                                            </td>";
            strHTML += "                                            <td class='chtpersonnamecell'>";
            strHTML += "                                                <span id='lblPersonName" + i.toString() + "'>" + obj.name + "</span>";
            strHTML += "                                            </td>";
            strHTML += "                                            <td id='tdstatus" + i.toString() + "'>";
            strHTML += "                                                <img class='" + obj.status + "' width='1' height='1' src='img/spacer.gif' />";
            strHTML += "                                            </td>";
            strHTML += "                                        </tr>";
            strHTML += "                                    </table>";
            strHTML += "                                </a>";
            strHTML += "                            </td>";
            strHTML += "                        </tr>";
        });
        strHTML += "                    </table>";
        strHTML += "                </td>";
        strHTML += "            </tr>";
        strHTML += "            <tr>";
        strHTML += "                <td class='tlbchatsearch' valign='middle'>";
        strHTML += "                    <table>";
        strHTML += "                        <tr>";
        strHTML += "                            <td valign='middle'>";
        strHTML += "                                <input type='text' class='searchpersonbox' onKeyup='SeachChatPersons(this);'/>";
        strHTML += "                            </td>";
        strHTML += "                            <td valign='middle'>";
        strHTML += "                                <img id='lnkchatsetting' class='settingbutton' alt='setting' width='1' height='1'";
        strHTML += "                                    src='img/spacer.gif' onclick='ItemActionButtons.onSaveExtraClick.apply(this)' />";
        strHTML += "                            </td>";
        strHTML += "                            <td valign='middle'>";
        strHTML += "                                <img id='lnkChatminimised' class='tooglebutton' alt='minimise' width='1' height='1'";
        strHTML += "                                    src='img/spacer.gif' />";
        strHTML += "                            </td>";
        strHTML += "                        </tr>";
        strHTML += "                    </table>";
        strHTML += "                </td>";
        strHTML += "            </tr>";
        strHTML += "        </table>";
        strHTML += "    </div>";
        strHTML += "    <input id='hdnMyImage' type='hidden' value='<img src=img/mohit.jpg />' />";
        strHTML += "    <div id='chatwindow' class='slider'>";
        strHTML += "    </div>";
        strHTML += "    <div class='ItemActionButtons'>";
        strHTML += "        <ul class='SettingOptions ui-corner-bottom' id='ChatListSettingOptions'>";
        strHTML += "            <li onclick='$('#ChatListSettingOptions').toggle(); ItemActionButtons.ChatfromDesktop.apply(this)'>";
        strHTML += "                Chat from Desktop</li>";
        strHTML += "            <li onclick='$('#ChatListSettingOptions').toggle(); ItemActionButtons.ChatSounds.apply(this)'>";
        strHTML += "                Chat Sounds</li>";
        strHTML += "            <li onclick='$('#ChatListSettingOptions').toggle(); ItemActionButtons.AdvanceSettings.apply(this)'>";
        strHTML += "                Advance Settings...</li>";
        strHTML += "            <li onclick='$('#ChatListSettingOptions').toggle(); ItemActionButtons.TurnOffChat.apply(this)'>";
        strHTML += "                Turn Off Chat</li>";
        strHTML += "        </ul>";
        strHTML += "    </div>";
        $("#divchat").append(strHTML);
    }



    $(".personlink").hover(function () {
        $(this).popover('show');
    });
    $(".personlink").mouseleave(function () {
        $(this).popover('hide');
    });

    $(".personlink").click(function () {
        var RecId = this.id.toString().replace("lnkPerson", "");
        if ($("#tblChatBox" + RecId).length == 0) {

            //var ChatBoxHTML = "<table id='tblChatBox" + RecId + "' class='chatbox'><tr id='tblchatwindowboxheader" + RecId + "' onclick='minimiseChatwindow(this);' ><th> <table width='100%'><tr><td style='width:5%'>" + $("#tdstatus" + RecId).html() + "</td><td style='width:80%' align='left'> " + $("#lblPersonName" + RecId).text() + " </td><td style='width:5%'><img id='lnkChatvideo'  class='chatcameraicon' alt='camera' width='1' height='1' src='img/spacer.gif' /></td><td style='width:7%'><img id='lnkChatboxsetting" + RecId + "'  class='chatboxsettingbutton' alt='camera' width='1' height='1' src='img/spacer.gif' onclick='ToogleChatboxSettingMenu(this);'/></td><td style='width:5%' align='right'> <a id='btnclose" + RecId + "' href='#' class='closebutton'>X</a> </td></tr></table>  </th></tr><tr><td> <div style='height: 215px; overflow:auto;'> <table  id='tblChatHistoryArea" + RecId + "'><tbody><tr><td></td><td></td></tr></tbody></table> </div> </td> </tr> <tr> <td style='vertical-align: top'> <input id='txtChatEnter" + RecId + "' onKeydown='Javascript: if (event.keyCode==13) {SendTextChat(this);}' type='text' class='chattextbox' /> </td> </tr> </table><div id='divchatminimisedbox" + RecId + "' class='chatminimisedbox' onclick='maximiseChatwindow(this);' style='display: none'>" + $("#tdstatus" + RecId).html() + $("#lblPersonName" + RecId).text() + "</div>";
            var ChatBoxHTML = "<table id='tblChatBox" + RecId + "' class='chatbox'><tr id='tblchatwindowboxheader" + RecId + "' onclick='minimiseChatwindow(this);' ><th> <table width='100%'><tr><td style='width:5%'>" + $("#tdstatus" + RecId).html() + "</td><td style='width:80%' align='left'> " + $("#lblPersonName" + RecId).text() + " </td><td style='width:5%'><img id='lnkChatvideo'  class='chatcameraicon' alt='camera' width='1' height='1' src='img/spacer.gif' /></td><td style='width:7%'><img id='lnkChatboxsetting" + RecId + "'  class='chatboxsettingbutton' alt='camera' width='1' height='1' src='img/spacer.gif' onclick='ToogleChatboxSettingMenu(this);'/></td><td style='width:5%' align='right'> <a id='btnclose" + RecId + "' href='#' class='closebutton'>X</a> </td></tr></table>  </th></tr><tr><td> <div style='height: 215px; overflow:auto;'> <table  id='tblChatHistoryArea" + RecId + "'><tbody><tr><td></td><td></td></tr></tbody></table> </div> </td> </tr> <tr> <td style='vertical-align: top'> <input id='txtChatEnter" + RecId + "' onKeydown='Javascript: if (event.keyCode==13) {SendTextChat(this);}' type='text' class='chattextbox' /> </td> </tr> </table><div id='divchatminimisedbox" + RecId + "' class='chatminimisedbox' onclick='maximiseChatwindow(this);' style='display: none'>" + $("#tdstatus" + RecId).html() + $("#lblPersonName" + RecId).text() + "&nbsp;&nbsp; <img id='imgChatListNotification' style='width:9px;height:9px;' src='img/onlineblink.gif' /></div>";

            ChatBoxHTML += "    <div class='ItemActionButtons'>";
            ChatBoxHTML += "        <ul class='SettingOptions ui-corner-bottom' id='ChatboxSettingOptions" + RecId + "'>";
            ChatBoxHTML += "            <li onclick='$('#ChatboxSettingOptions" + RecId + "').toggle(); ItemActionButtons.ChatfromDesktop.apply(this)'>";
            ChatBoxHTML += "                Upload Files...</li>";
            ChatBoxHTML += "            <li onclick='$('#ChatboxSettingOptions" + RecId + "').toggle(); ItemActionButtons.ChatSounds.apply(this)'>";
            ChatBoxHTML += "                Add Friends to chat...</li>";
            ChatBoxHTML += "            <li onclick='$('#ChatboxSettingOptions" + RecId + "').toggle(); ItemActionButtons.AdvanceSettings.apply(this)'>";
            ChatBoxHTML += "                Turn off Chat for " + $("#lblPersonName" + RecId.toString()).text() + "</li>";
            ChatBoxHTML += "            <li onclick='$('#ChatboxSettingOptions" + RecId + "').toggle(); ItemActionButtons.TurnOffChat.apply(this)'>";
            ChatBoxHTML += "                See Full Conversation</li>";
            ChatBoxHTML += "            <li onclick='$('#ChatboxSettingOptions" + RecId + "').toggle(); ItemActionButtons.TurnOffChat.apply(this)'>";
            ChatBoxHTML += "                Clear window</li>";
            ChatBoxHTML += "            <li onclick='$('#ChatboxSettingOptions').toggle(); ItemActionButtons.TurnOffChat.apply(this)'>";
            ChatBoxHTML += "                Report as Spam or Abuse...</li>";
            ChatBoxHTML += "        </ul>";
            ChatBoxHTML += "    </div>";


            $("#chatwindow").append(ChatBoxHTML);
        }
        else {
            $("#tblChatBox" + RecId).show();
            $("#divchatminimisedbox" + RecId).hide();
        }

        $(".closebutton").click(function (e) {
            var RecId = this.id.toString().replace("btnclose", "");
            $("#tblChatBox" + RecId).hide();
            e.stopPropagation();
        });


        $("#lnkChatboxsetting" + RecId.toString()).click(function (e) {
            var RecId = this.id.toString().replace("lnkChatboxsetting", "");

            var $IsHoverExtraOptionsFlag = 0;
            $(document).delegate('#lnkChatboxsetting' + RecId.toString(), 'mouseleave', function () { setTimeout(function () { if (!ItemActionButtons.isHoverMenu) { $('#ChatboxSettingOptions' + RecId.toString()).hide(); } }, 100, 1) });
            $(document).delegate('#ChatboxSettingOptions' + RecId.toString(), 'mouseenter', function () { ItemActionButtons.isHoverMenu = true; });
            $(document).delegate('#ChatboxSettingOptions' + RecId.toString(), 'mouseleave', function () { $('#ChatboxSettingOptions' + RecId.toString()).hide(); ItemActionButtons.isHoverMenu = false; });


            $('#lnkChatboxsetting' + RecId.toString()).button({ icons: { primary: "ui-icon-plusthick"} });
            $('#ChatboxSettingOptions' + RecId.toString() + ' li').addClass('ui-corner-all ui-widget');
            $('#ChatboxSettingOptions' + RecId.toString() + ' li').hover(
            function () { $(this).addClass('ui-state-default'); },
            function () { $(this).removeClass('ui-state-default'); }
        );
            $('#ChatboxSettingOptions' + RecId.toString() + ' li').mousedown(function () { $(this).addClass('ui-state-active'); });
            $('#ChatboxSettingOptions' + RecId.toString() + ' li').mouseup(function () { $(this).removeClass('ui-state-active'); });
            e.stopPropagation();
        });


        return false;
    });



    $("#lnkChatminimised").click(function () {
        $("#chatminimisedlist").show();
        $("#Chat").hide();
    });

    $("#chatminimisedlist").click(function () {
        $("#chatminimisedlist").hide();
        $("#Chat").show();
    });





    $(document).delegate('#lnkchatsetting', 'mouseleave', function () { setTimeout(function () { if (!ItemActionButtons.isHoverMenu) { $('#ChatListSettingOptions').hide(); } }, 100, 1) });
    $(document).delegate('#ChatListSettingOptions', 'mouseenter', function () { ItemActionButtons.isHoverMenu = true; });
    $(document).delegate('#ChatListSettingOptions', 'mouseleave', function () { $('#ChatListSettingOptions').hide(); ItemActionButtons.isHoverMenu = false; });

    var $IsHoverExtraOptionsFlag = 0;
    $(document).ready(function () {
        $(".button").button();
        $(".buttonset").buttonset();
        $('#lnkchatsetting').button({ icons: { primary: "ui-icon-plusthick"} });
        $('#ChatListSettingOptions li').addClass('ui-corner-all ui-widget');
        $('#ChatListSettingOptions li').hover(
            function () { $(this).addClass('ui-state-default'); },
            function () { $(this).removeClass('ui-state-default'); }
        );
        $('#ChatListSettingOptions li').mousedown(function () { $(this).addClass('ui-state-active'); });
        $('#ChatListSettingOptions li').mouseup(function () { $(this).removeClass('ui-state-active'); });
    });

    var ItemActionButtons = {
        isHoverMenu: false,
        onSaveExtraClick: function () {
            $('#ChatListSettingOptions').toggle();
            var btnLeft = $('#lnkchatsetting').offset().left - $('#ChatListSettingOptions').outerWidth() + $('#lnkchatsetting').outerWidth() + 10;
            var btnTop = $('#lnkchatsetting').offset().top - $('#ChatListSettingOptions').outerHeight();
            var btnWidth = $('#lnkchatsetting').outerWidth();
            $('#ChatListSettingOptions').css('left', btnLeft).css('top', btnTop);
        },
        ChatfromDesktop: function () { },
        ChatSounds: function () { },
        AdvanceSettings: function () { },
        TurnOffChat: function () { }
    }

});




function SendTextChat(txtChatEnter) {
    if ($(txtChatEnter).val() != "") {
        var RecId = $(txtChatEnter).attr('id').toString().replace("txtChatEnter", "");
        $('#tblChatHistoryArea' + RecId + ' tr:last').after("<tr><td valign='top' style='vertical-aligh:top' class='chtpersonimgcell'>" + $("#hdnMyImage").val() + "</td><td>: " + $(txtChatEnter).val() + " </td></tr>");
        $(txtChatEnter).val("");
        $('#tblChatHistoryArea' + RecId).parent().scrollTop($('#tblChatHistoryArea' + RecId).parent()[0].scrollHeight);
    }
    return false;
}

function minimiseChatwindow(lnkminimise) {
    var RecId = $(lnkminimise).attr('id').toString().replace("tblchatwindowboxheader", "");
    $("#tblChatBox" + RecId).hide();
    $("#divchatminimisedbox" + RecId).show();
    return false;
}

function maximiseChatwindow(lnkmiximise) {
    var RecId = $(lnkmiximise).attr('id').toString().replace("divchatminimisedbox", "");
    $("#tblChatBox" + RecId).show();
    $("#divchatminimisedbox" + RecId).hide();
    return false;
}

function ToogleChatboxSettingMenu($this) {
    var RecId = $this.id.toString().replace("lnkChatboxsetting", "");
    $('#ChatboxSettingOptions' + RecId.toString()).toggle();
    var btnLeft = $('#lnkChatboxsetting' + RecId.toString()).offset().left + $('#lnkChatboxsetting' + RecId.toString()).outerWidth();
    var btnTop = $('#lnkChatboxsetting' + RecId.toString()).outerHeight();
    var btnWidth = $('#lnkChatboxsetting' + RecId.toString()).outerWidth();
    $('#ChatboxSettingOptions' + RecId.toString()).css('left', btnLeft).css('top', btnTop);
}

function SeachChatPersons($this) {    
    var searchCriteria = $($this).val();    
    $(".tdchatlist table[id*='tblchat'] tr[id*='trchat']").each(function () {
        var personName = $("span[id*='lblPersonName']:eq(0)", this).text();
        if (personName.toLowerCase().indexOf(searchCriteria.toLowerCase()) != -1) {            
            $(this).show();
        }
        else {            
            $(this).hide();
        }
    });
    return false;
}