/* File Created: June 29, 2013 */

/// <reference path="Scripts/jquery-1.7.js" />
/// <reference path="Scripts/jQuery.tmpl.js" />
/// <reference path="Scripts/jquery.cookie.js" />
/// <reference path="Chat.ui.js" />


(function ($, window, ui, utility, ko, kovalidation) {
    // debugger;
    "use strict";
    "use strict";
    $.support.cors = true;

    var localdevip = "localhost";
    var localhostedserverip = "192.168.0.201";
    var publicip = "173.160.122.195";
    var currentip = publicip;



    var messageHistory = [],
        memberactionurl = "http://" + currentip + "/Anewluv.Web.MemberActionsService/MemberActionsService.svc/Rest/",
        lookupserviceurl = " http://" + currentip + "/Anewluv.Web.CommonService/LookupService.svc/Rest/",
        membermapperurl = "http://" + currentip + "/Anewluv.Web.MembersService/MembersMapperService.svc/Rest/",
        memberserviceurl = "http://" + currentip + "/Anewluv.Web.MembersService/MembersService.svc/Rest/",
        membershipserviceurl = "http://" + currentip + "/Anewluv.Web.AuthenticationService/MembershipService.svc/Rest/",
        geoserviceurl = "http://" + currentip + "/Anewluv.Web.GeoService/GeoService.svc/Rest/",
        historyLocation = 0,
        originalTitle = document.title,
        unread = 0,
        isUnreadMessageForUser = false,
        focus = true,
        loadingHistory = false,
        checkingStatus = false,
        typing = false,
        typingTimeoutId = null,
        $ui = $(ui),
          $knockout = $(ko), $kovalidation = $(kovalidation),
        messageSendingDelay = 1500,
        pendingMessages = {};



    function registrationinit() {
        //  preferences[name] = value;
        $(ui).trigger(ui.events.registrationloaded);

    }

    //put the viewmodels on the UI for now

    var EmpViewModel = function (callingui) {
        //Make the self as 'this' reference

        //TO DO fix this binding to tie to the UI or move viewmodel to the view
        var self = this;
        //Declare observable which will be bind with UI 
        self.birthdate = ko.observable(new Date());  //TO DO set the date to be and old date -21 days        
        //self.city = ko.observable("");
        self.emailaddress = ko.observable("");
        self.confirmemailaddress = ko.observable("");
        self.password = ko.observable("");
        self.confirmpassword = ko.observable("");
        self.selectedcountry = ko.observable("");
        self.selectedcity = ko.observable(); //the current selectyed city

        self.selectedstateprovince = ko.observable("");

        self.selectedziporpostalcode = ko.observable("");
        self.gender = ko.observable("");
        self.lattitude = ko.observable("");
        self.longitude = ko.observable("");
        self.openididentifer = ko.observable("");
        self.openidprovider = ko.observable("");
        self.postalcodestatus = ko.observable("");
        self.screenname = ko.observable("");
        self.username = ko.observable("");

        //collections bound to viewmodel for now
        self.cities = ko.observableArray([]);
        self.countries = ko.observableArray([]);
        self.genders = ko.observableArray([]);
        self.countries = ko.observableArray([]);
        self.registrationphotos = ko.observableArray([]);
        self.ziporpostalcodes = ko.observableArray([]);

        //Commands 
        //Should only hit create if validation passes
        self.create = function () {
            debugger;
            if (this.itemToAdd() != "") {
                this.items.push(this.itemToAdd()); // Adds the item. Writing to the "items" observableArray causes any associated UI to update. 
                this.itemToAdd(""); // Clears the text box, because it's bound to the "itemToAdd" observable 
            }
        } .bind(this);  // Ensure that "this" is always this view model


        //The Object which stored data entered in the observables
        var registerdata = {
            //        EmpNo: self.EmpNo,
            //        EmpName: self.EmpName,
            //        Salary: self.Salary,
            //        DeptName: self.DeptName,
            //        Designation: self.Designation

            birthdate: self.birthdate,
            city: self.selectedcity,
            emailaddress: self.emailaddress,
            confirmemailaddress: self.confirmemailaddress,
            password: self.password,
            confirmpassword: self.confirmpassword,
            country: self.selectedcountry,
            stateprovince: self.selectedstateprovince,
            ziporpostalcode: self.selectedziporpostalcode,
            gender: self.gender,
            lattitude: self.lattitude,
            longitude: self.longitude,
            openididentifer: self.openididentifer,
            openidprovider: self.openidprovider,
            postalcodestatus: self.postalcodestatus,
            screenname: self.screenname,
            username: self.username
        };

        Getgenders();
        // GetProfileData();
       // GetCountries();
        //get the collection data from services 

        self.cities = function () {
            if (self.country = "" && self.city == "") return;
            self.cities.removeAll();
            $.ajax({
                url: geoserviceurl + "getfilteredcitiesbycountryandfilter",
                type: "GET",
                success: function (data) {
                    for (i = 0; i < data.length; i++) {
                        viewModel.MyArray.push(data[i]);
                    }
                }
            });
        }


        self.countries = function () {
            //Ajax Call Get All Employee Records
            $.ajax({
                type: "GET",
                url: geoserviceurl + "getcountrylist/",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    //  self.Employees(data); //Put the response in ObservableArray
                    // return new listitem(data);
                    alert("test");
                },
                error: function (error) {
                    alert(error.status + "<--and--> " + error.statusText);
                }
            });
            //Ends Here
        }


         function GetCountries() {
         debugger;
           var urltest =  geoserviceurl + "getcountrylist";
            //Ajax Call Get All Employee Records
            $.ajax({

                // The 'type' property sets the HTTP method.
                // A value of 'PUT' or 'DELETE' will trigger a preflight request.
                type: 'GET',
                // The URL to make the request to.
                url: geoserviceurl + "getcountrylist",
                contentType: 'text/plain',
                xhrFields: {
                    withCredentials: false
                },
                headers: {
                },
                success: function (data) {
                    //  self.Employees(data); //Put the response in ObservableArray
                    // return new listitem(data);
                    // self.genders(data); //Put the response in ObservableArray
                    var i = 0;
                    for (i = 0; i < data.length; i++) {
                        self.countries.push(new listitem(data[i]));
                    }
                    //  $.each(data, function (key, val) {
                    //  self.customers.push(new listitem(val.Id, val.Name, val.Age, val.Comments));             
                },
                error: function (error) {
                    alert(error.status + "<--and--> " + error.statusText);
                }
            });



        }


        


        function Getgenders() {
            //Ajax Call Get All Employee Records
            $.ajax({

                // The 'type' property sets the HTTP method.
                // A value of 'PUT' or 'DELETE' will trigger a preflight request.
                type: 'GET',
                // The URL to make the request to.
                url: lookupserviceurl + "getgenderlist",
                contentType: 'text/plain',
                xhrFields: {
                    withCredentials: false
                },
                headers: {
                },
                success: function (data) {
                    //  self.Employees(data); //Put the response in ObservableArray
                    // return new listitem(data);
                    // self.genders(data); //Put the response in ObservableArray
                    var i = 0;
                    for (i = 0; i < data.length; i++) {
                        self.genders.push(new listitem(data[i]));
                    }
                    //  $.each(data, function (key, val) {
                    //  self.customers.push(new listitem(val.Id, val.Name, val.Age, val.Comments));             
                },
                error: function (error) {
                    alert(error.status + "<--and--> " + error.statusText);
                }
            });



        }



        
        
    }  //Ends Here



    //contrctutor to setup lists
    var listitem = function (data) {
        var self = this;
        self.id = ko.observable(data ? data.id : 0);
        self.description = ko.observable(data ? data.description : 0);
        self.selected = ko.observable(data.selected ? data.selected : '');
    };


    $(ui).bind(ui.events.registrationloaded, function (ev) {

        // updateCookie();
        //bind knockout JS on page loaded
        ko.applyBindings(new EmpViewModel(ev.target));

    });


    //Sample for pages where we have preloaded data that needs to be loaded.
    //for register we dont need to do this its all new data
    //build veiwmodels
    //    function MyViewModel(urls) {
    //        var self = this;
    //        self.isLoading = ko.observable(true);
    //        self.items = ko.observableArray();
    //        self.loadData = function () {
    //            $.get(urls.load, function (data) {
    //                // Process data and push into our items array
    //                self.isLoading(false);
    //            });
    //        }
    //    }

    //    var vm = new MyViewModel({
    //        load: '@Url.Action("GetData", "MyItemController")'
    //    });

    //    $(function () {
    //        ko.applyBindings(vm);
    //        viewModel.loadData();
    //    });



    function getFlagCssClass(user) {
        return (user.Flag) ? 'flag flag-' + user.Flag : '';
    }


    function getUserViewModel(user, isOwner) {
        var lastActive = user.LastActivity.fromJsonDate();
        return {
            name: user.Name,
            screenName: user.ScreenName,
            hash: user.Hash,
            owner: isOwner,
            active: user.Active,
            noteClass: getNoteCssClass(user),
            note: getNote(user),
            flagClass: getFlagCssClass(user),
            flag: user.Flag,
            country: user.Country,
            lastActive: lastActive,
            timeAgo: $.timeago(lastActive)
        };
    }

    function getMessageViewModel(message) {
        var re = new RegExp("\\b@?" + chat.name.replace(/\./, '\\.') + "\\b", "i");
        return {
            name: message.User.Name,
            screenName: message.User.ScreenName,
            hash: message.User.Hash,
            message: message.Content,
            id: message.Id,
            date: message.When.fromJsonDate(),
            highlight: re.test(message.Content) ? 'highlight' : '',
            isOwn: re.test(message.User.name)
        };
    }

    // Save some state in a cookie
    function updateCookie() {
        var state = {
            userId: chat.id,
            activeRoom: chat.activeRoom,
            preferences: ui.getState()
        },
        jsonState = window.JSON.stringify(state);

        $.cookie('jabbr.state', jsonState, { path: '/', expires: 30 });
    }

    function updateTitle() {
        if (unread === 0) {
            document.title = originalTitle;
        }
        else {
            document.title =
                (isUnreadMessageForUser ? '*' : '')
                + '(' + unread + ') ' + originalTitle;
        }
    }

    $ui.bind(ui.events.typing, function () {
        // If not in a room, don't try to send typing notifications


        return "";


    });


    $(function () {
        var stateCookie = $.cookie('register.state'),
            state = stateCookie ? JSON.parse(stateCookie) : {};

        // Initialize the ui, passing the user preferences
        ui.initialize("na");

        registrationinit();


        //TO DO bind these to the status box using hightlight and error
        //ui.addMessage('Welcome to ' + originalTitle, 'notification');
        //ui.addMessage('Type /help to see the list of for anewluv chat test', 'notification');



    });

})(jQuery, window, window.register.ui, window.chat.utility, window.ko, window.ko.validation);