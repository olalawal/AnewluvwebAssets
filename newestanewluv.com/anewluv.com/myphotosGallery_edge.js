/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "0.1.5",
   build: "0.9.0.113",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: true,
   content: {
         dom: [
         {
            id:'outerPhoto',
            type:'rect',
            rect:[-42,138,426,300],
            fill:["rgba(192,192,192,1)"],
            stroke:[2,"rgb(0, 0, 0)","solid"],
            transform:[[149,39],[0,0],[0],[1,1]]
         },
         {
            id:'Text',
            type:'text',
            rect:[-24,448,0,0],
            text:"caption",
            font:["Arial Black, Gadget, sans-serif",[24,""],"rgba(0,0,0,1)","normal","none",""],
            transform:[[289,2],[0,0],[0],[1,1]]
         }         {
            id:'pic',
            type:'rect',
            rect:[39,226,92,92],
            fill:["rgba(192,192,192,1)"],
            stroke:[2,"rgb(0, 0, 0)","solid"],
            transform:[[120,-22],[0,0],[0],[1,1]]
         },
         {
            id:'pic2',
            type:'rect',
            rect:[39,226,92,92],
            fill:["rgba(192,192,192,1)"],
            stroke:[2,"rgb(0, 0, 0)","solid"],
            transform:[[322,110]]
         },
],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_outerPhoto}": [
            ["transform", "translateX", '149px'],
            ["style", "border-width", '2px'],
            ["style", "height", '300px'],
            ["style", "border-style", 'solid'],
            ["transform", "translateY", '39px'],
            ["style", "width", '426px']
         ],
         "${_Text}": [
            ["transform", "translateX", '289px'],
            ["transform", "translateY", '2px']
         ],
         "${_pic}": [
            ["transform", "translateX", '120px'],
            ["style", "border-width", '2px'],
            ["style", "height", '92px'],
            ["style", "border-style", 'solid'],
            ["transform", "translateY", '-22px'],
            ["style", "width", '92px']
         ],
         "${_pic2}": [
            ["transform", "translateX", '322px'],
            ["transform", "translateY", '110px'],
            ["style", "height", '92px'],
            ["style", "border-style", 'solid'],
            ["style", "border-width", '2px'],
            ["style", "width", '92px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 0,
         autoPlay: true,
         labels: {

         },
         timeline: [
         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-132253550");
