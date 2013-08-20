/* File Created: June 29, 2013 */

/// <reference path="Scripts/jquery-1.7.js" />
/// <reference path="Scripts/jQuery.tmpl.js" />
/// <reference path="Scripts/jquery.cookie.js" />
/// <reference path="Chat.ui.js" />


(function ($, window, ui, utility, ko) {
    "use strict";
    $.support.cors = true;

    var localdevip = "localhost";
    var localhostedserverip = "192.168.0.201";
    var publicip = "173.160.122.195";

    var currentip = publicip;

    var messageHistory = [],
        memberactionurl = "http://" + currentip + "/MemberActionsService/MemberActionsService.svc/Rest/",
        lookupserviceurl = " http://" + currentip + "/Common/LookupService.svc/Rest/",
        membermapperurl = "http://" + currentip + "/membersservice/MembersMapperService.svc/Rest/",


    //http://192.168.0.201/membersservice/membersservice.svc/Rest/
    // http://192.168.0.201/MemberActionsService/MemberActionsService.svc/Rest/
    // http://192.168.0.201/Common/LookupService.svc/Rest
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
        $knockout = $(ko),
        messageSendingDelay = 1500,
        pendingMessages = {};



    //TO do add this to the ultils 
    function make_base_auth(user, password) {
        var tok = user + ':' + pass;
        var hash = $.base64.encode(tok);
        return "Basic " + hash;
    }

    function profileMemberinit() {
        //  preferences[name] = value;
        $(ui).trigger(ui.events.profileMemberLoaded);

    }


    //put the viewmodels on the UI for now    
    var EmpViewModel = function (callingui) {
        //Make the self as 'this' reference        
        //TO DO fix this binding to tie to the UI or move viewmodel to the view
        var self = this;
        //Declare observable which will be bind with UI
        self.whotookapeek = ko.observable("");
        self.gender = ko.observable("");
        self.photo = ko.observable("");
        self.interestsent = ko.observable("");
        self.profileblocked = ko.observable("");
        self.whoipeekedat = ko.observable("");
        self.likes = ko.observable("");
        self.whoilike = ko.observable("");
        self.interests = ko.observable("");
        self.newmail = ko.observable("");
        self.newinterests = ko.observable("");
        self.newlikes = ko.observable("");
        self.previousPage = ko.observable("");
        self.nextPage = ko.observable("");

        //collections bound to viewmodel for now        
        self.genders = ko.observableArray([]);
        self.photos = ko.observableArray([]);
        //        
        /*self.previousPageEnabled = ko.observable("");
        self.nextPageEnabled = ko.observable("");*/
        self.nextPageEnabledMOD = ko.observable("");
        self.previousPageEnabledMOD = ko.observable("");

        self.items = ko.observableArray([]);
        self.pagedItems = ko.observableArray([]);
        self.allPages = ko.observableArray([]);

        //The Object which stored data entered in the observables
        var MyProfileData = {
            whotookapeek: self.whotookapeek,
            gender: self.gender,
            interestsent: self.interestsent,
            profileblocked: self.profileblocked,
            whoipeekedat: self.whoipeekedat,
            likes: self.likes,
            whoilike: self.whoilike,
            interests: self.interests,
            newmail: self.newmail,
            newinterests: self.newinterests,
            newlikes: self.newlikes
        };
        //        
         Getgenders();
         GetProfileData();
         GetActivityData();
         GetProfilePhotos();


        var username = 'case';
        var password = 'drive333';
        var profileid = 1;


        //TESTING METHOD
        /*$.ajax({
      
        type: "GET",
        url: memberactionurl + "getwhoipeekedatcount/1",
        beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
        },
        success: function () {
        alert('success');
        },
        error: function (err) {
        alert('err is  ' + err.statusText);
        }

        }).done(function (data) {
        var obj = jQuery.parseJSON(data);
        alert('done...!' + obj);
        })*/


        //get the collection data from services 
        function GetProfileData() {
            //
            profileid = 1;
            // debugger;
            var urltest = memberactionurl + "getwhopeekedatmecount/" + profileid;
            //
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwhopeekedatmecount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                contentType: 'text/plain',
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.whotookapeek(obj);
                },
                error: function (err) {
                    //  alert(err.statusText);
                }
            });
            //getwhopeekedatmecount Ends Here

            /// get interestsent 
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwhoiaminterestedincount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.interestsent(obj);
                },
                error: function (err) {
                    //  alert(err.statusText);
                }
            });
            //// get interestsent ends here

            ////get profile blocked count 
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwhoiblockedcount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.profileblocked(obj);
                },
                error: function (err) {
                    //  alert(err.statusText);
                }
            });
            ///profile blocked ends here

            /// whoipeekedat starts here
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwhoipeekedatcount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.whoipeekedat(obj);
                },
                error: function (err) {
                    //  alert(err.statusText);
                }
            });
            ///whoipeekedat ends here

            ///likes count start
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwholikesmecount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.likes(obj);
                },
                error: function (err) {
                    //  alert(err.statusText);
                }
            });
            ///likes count ends

            /// whoilike start
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwhoilikecount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.whoilike(obj);
                },
                error: function (err) {
                    //  alert(err.statusText);
                }
            });
            ///whoilike end

            /// get interests
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwhoisinterestedinmecount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.interests(obj);
                },
                error: function (err) {
                    //  alert(err.statusText);
                }
            });
            /// get interests END
        }
        //get profile data ends here


        ///get activity data
        function GetActivityData() {

          
            profileid = 1;
            //
            //TODO YET TO IMPLEMENT THE WEBSERVICE
            ///get newmail 
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwhoisinterestedinmenewcount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.newmail(obj);
                },
                error: function (err) {
                    // alert(err.statusText);
                }
            });
            ///get newmail ends

            /// get newinterests
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwhoisinterestedinmenewcount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.newinterests(obj);
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });
            ///new interests end


            /// get newlikes 
            $.ajax({

                type: "GET",
                url: memberactionurl + "getwhoislikesmenewcount/" + profileid,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2FzZTpkcml2ZTMzMw==');
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    self.newlikes(obj);
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });
            /// new likes end
        }

        //get gender list
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
                    var i = 0;
                    for (i = 0; i < data.length; i++) {
                        self.genders.push(new listitem(data[i]));
                    }
                },
                error: function (error) {
                    // alert(error.status + "<--and--> " + error.statusText);
                }
            });
        }
        //

        //Paging Related Stuff
        self.nextPage = function () {
            if (self.nextPageEnabled()) {
                self.currentPage(self.currentPage() + 1);
            }
        };

        self.previousPage = function () {
            if (self.previousPageEnabled()) {
                self.currentPage(self.currentPage() - 1);
            }
        };
        //
        self.moveToPage = function (index) {            
            self.pageIndex(index);
            if (self.pageIndex() > index) {
                if (self.previousPageEnabled()) {                    
                    self.currentPage(index - 1);
                }
            }
            else {
                if (self.nextPageEnabled()) {
                    //self.currentPage(self.currentPage() + 1);
                    self.currentPage(index + 1);
                }
            }
        };

        //NEW Paging Stuff
        self.pageSize = ko.observable(4);
        self.pageIndex = ko.observable(0);
        self.maxPageIndex = ko.observable(0);

        //Get Profile Photos
        function GetProfilePhotos() {
            //
            // debugger;
            var url = membermapperurl + "getquickmatches";
            //
            $.ajax({
                type: "POST",
                data: '{"profileid":"1"}',
                contentType: "text/json",
                url: url,
                success: function (data) {
                    var i = 0;
                    for (i = 0; i < data.length; i++) {
                        self.photos.push({ path: 'data:image/jpg;base64,' + data[i].galleryphoto.photo, name: data[i].screenname, age: data[i].age, countryname: data[i].countryname, online: data[i].online });
                    }
                    // pager related stuff OLD
                    // ---------------------------------------------

                    self.currentPage = ko.observable(1);
                    self.perPage = ko.observable(4);
                    
                    self.maxPageIndex = ko.dependentObservable(function () {
                        return Math.ceil(self.photos().length / self.pageSize()) - 1;
                    });

                    var pg = self.currentPage(),
                                start = self.perPage() * (pg - 1),
                                end = start + self.perPage();

                    /*self.allPages = ko.dependentObservable(function () {
                        var pages = [];
                        for (i = 0; i <= self.maxPageIndex() ; i++) {
                            pages.push({ pageNumber: (i + 1) });
                        }
                        return pages;
                    });*/


                    self.allPages = ko.computed({
                        read: function () {
                            var pages = [];
                            for (i = 0; i <= self.maxPageIndex() ; i++) {
                                pages.push({ pageNumber: (i + 1) });
                                self.allPages.push({ pageNumber: (i + 1) });
                            }
                            return pages;
                        },
                        write: function (value) {
                            
                        },
                        owner: self
                    });


                    self.pagedItems = ko.computed({
                        read: function () {                            
                            var pg = self.currentPage();                            
                               start = self.perPage() * (pg - 1),
                               end = start + self.perPage();
                                return self.items(self.photos().slice(start, end));
                            /*if (start <= self.items._latestValue.length && start >= 0) {
                                return self.items(self.photos().slice(start, end));
                            }
                            else {
                                return null;
                            }*/
                        },
                        write: function (value) {
                            var pg = self.currentPage(),
                                start = self.perPage() * (pg - 1),
                                end = start + self.perPage();
                            self.items(self.photos().slice(start, end));
                        },
                        owner: self
                    });

                    self.nextPageEnabled = ko.computed({
                        read: function () {                            
                            //return self.nextPageEnabledMOD(self.photos().length > self.perPage() * self.currentPage());
                            self.nextPageEnabledMOD(self.photos().length > self.perPage() * self.currentPage());
                            return self.photos().length > self.perPage() * self.currentPage();
                        },
                        write: function (value) {                            
                            self.nextPageEnabledMOD(self.photos().length > self.perPage() * self.currentPage());
                        },
                        owner: self
                    });

                    self.previousPageEnabled = ko.computed({
                        read: function () {
                            self.previousPageEnabledMOD(self.currentPage() > 1);
                            return self.currentPage() > 1;
                        },
                        write: function (value) {
                            self.previousPageEnabledMOD(self.currentPage() > 1);
                        },
                        owner: self
                    });
                    ////

                },
                error: function (errmsg) {
                    // alert('error ocured:' + errmsg.responseText);
                }
            });
            //
        }
        //Ends Here

    }

    //contrctutor to setup lists
    var listitem = function (data) {
        var self = this;
        self.id = ko.observable(data ? data.id : 0);
        self.description = ko.observable(data ? data.description : 0);
        self.selected = ko.observable(data.selected ? data.selected : '');
    };


    $(ui).bind(ui.events.profileMemberLoaded, function (ev) {
        // debugger;
        // updateCookie();
        //bind knockout JS on page loaded
        ko.applyBindings(new EmpViewModel(ev.target));
    });



    $(function () {
        var stateCookie = $.cookie('register.state'),
            state = stateCookie ? JSON.parse(stateCookie) : {};

        // Initialize the ui, passing the user preferences
        ui.initialize("na");

        profileMemberinit();


        //TO DO bind these to the status box using hightlight and error
        //ui.addMessage('Welcome to ' + originalTitle, 'notification');
        //ui.addMessage('Type /help to see the list of for anewluv chat test', 'notification');

    });

})(jQuery, window, window.Anewluv.ui, window.chat.utility, window.ko);