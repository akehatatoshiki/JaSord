(function ()
{
  var ANTIEDGE = false;
  
  var Graph = function (graph,data,order) {
    //this._graph = []; // [{u: {v: edge, ...}}, ...]Ç¢ÇÁÇ»Ç¢ÇÃÇ≈ÇÕÅH
    this._degree = {}; // {u: degree, ...}
    this._indegree = {}; // {u: degree, ...}
    this._vertices = []; // [u, v, ...]
    this._vertex = {}; // {u: u, ...}
    this._size = 0;
    this._maptable = undefined;
    if (graph && data && order){
       _parse(graph,data,order);
    }
  }
  
  Graph.prototype.add = function (data,order){
     _parse(this,data,order);
  
  }
  Graph.prototype.link = function (src,dst,edge,prop){
     if(prop){
        _edgeing(this,dst,src,edge,prop);
     }else if(data && from && edge){
        _edgeing(this,dst,src,edge);
     }
  
  }
  Graph.prototype.vertex = function (identity)
  {
    for(var i = 0;i < this._vertices.length ;i++){
        if(this._vertices[i].identity == itentity){ return this._vertices[i];}
    }
    return false;
  }
  
  Graph.prototype.copy = function ()
  {
    return new Graph(this._graph);
  }
  Graph.prototype.order = function ()
  {
    return this._vertices.length;
  }
  
  Graph.prototype.del = function (identity)
  {
    for(var i = 0;i < this._vertices.length ;i++){
        if(this._vertices[i].identity == itentity){ 
             this._vertices.splice(i, 1);
             return true;
        }
    }
    return false;
  }
  
  Graph.prototype.clear = function ()
  {
    this._vertices = [];
  }
    
  Graph.prototype.show = function(){
    return this._vertices;
  }
  Graph.prototype.registermap = function(map){
     if(!(Object.prototype.toString.call(map).slice(8, -1) === "Object")){
     return false;
     }else{
        for(var n in map){
           if(n == "identity"){ return false; }
        }
        //console.log(map);
        this._maptable = map;
     }
  }
  function hash(key,value,attribute){
         var h = {};
         h[key] = value;
         if(attribute === true){ 
            h["attribute"] = new Array(); 
            h["degree"] = 0;
            h["indegree"] = 0;
            }
         return h;
  }
  
  Graph.prototype.matcher = function(pattern){
      if(!pattern) { return false; }
      var matchednode = new Array();
      function search_node(g,pat){
          //console.log(pat);
          var index = new Array();
          for(i = 0; i < g._vertices.length; i++){
             //console.log("//////" + i);
             //psh = check(pat,g._vertices[i]);
             if(g._vertices[i].identity && check(pat,g._vertices[i],g)){ 
                //console.log(psh)
                index.push(g._vertices[i]); 
             }
          }
          if(!(index.length == 0)){
             //console.log(index);
             return index;
          }else{
             return false;
          }
    }
    
    function check(pattern,node,g){
       if(!(pattern && node)){ return false; }
       patterns:
       for(var p in pattern){
          //console.log(p);
          if((Object.prototype.toString.call(pattern[p]).slice(8, -1) === "Object")){
             for(var k = 0; k < node.attribute.length; k++){
                var key = check_gap(node.attribute[k],p,g);
                if(node.attribute[k][key]){
                   if(check(pattern[p],node.attribute[k],g)){
                      continue patterns;
                   }
                }
             }
             return false;
          }else if(Object.prototype.toString.call(pattern[p]).slice(8, -1) === "Array"){
             //(node.attribute);
             for(var k = 0; k < node.attribute.length; k++){
                for(var j = 0; j < pattern[p].length; j++){
                    var key = check_gap(node.attribute[k],p,g);
                    if((node.attribute[k][key] == pattern[p][j]) || (pattern[p][j] == "_")){ continue patterns; }
                }
             }
             return false;
          }else{
             for(var k = 0; k < node.attribute.length; k++){
                var key = check_gap(node.attribute[k],p,g);
                //console.log(key);
                if((node.attribute[k][key] == pattern[p]) || (pattern[p] == "_")){ continue patterns; }
             }
             return false;
          }
       }
       return true;
   }
    function all_keys(pat){
       var keys;
       keys = Object.keys(pat);
       function nesting(data){
         if(Object.prototype.toString.call(data).slice(8, -1) === "Object"){
            //console.log(Object.keys(data));
            Array.prototype.push.apply(keys, Object.keys(data));
            //console.log(keys);
            for(var t in data){
               if(Object.prototype.toString.call(data[t]).slice(8, -1) === "Object"){ nesting(data[t]); }
            }
         }
       }
       nesting(pat);
       return keys.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
    }
    var res = search_node(this,pattern);
    //console.log(res);
    //console.log(res.length);
    return res; 
  }
  _equals = function(obj1, obj2) {
     var paramName;
     //console.log(obj1);
     //console.log(obj2);
     var compare = function(objA, objB, param) {
       var paramObjA = objA[param]
         , paramObjB = (typeof objB[param] === 'undefined') ? false : objB[param];
       
       switch (typeof objA[param]) {
         case "object" : return (_equals(paramObjA, paramObjB));
         case "function" : return (paramObjA.toString() === paramObjB.toString());
         default: return (paramObjA === paramObjB);
       }
     }
     
     for (paramName in obj1) {
       if (typeof obj2[paramName] === 'undefined' || !compare(obj1, obj2, paramName)) {
         return false;
       }
     }

     for (paramName in obj2) {
       if (typeof obj1[paramName] === 'undefined' || !compare(obj1, obj2, paramName)) {
         return false;
       }
     }
     //console.log(true);
     return true;
  }
  function _parse(graph,data,order){
      var g = graph;
      var container = new Array();
      function iterator(d){
         if(Object.prototype.toString.call(d).slice(8, -1) === "Object"){
            container.push(d);
            for(var n in d){
               iterator(d[n]);
            }
         }else if(Object.prototype.toString.call(d).slice(8, -1) === "Array"){
            container.push(d);
            for(j = 0; j < d.length; j++){
               iterator(d[j]);
            }
         }else{
            //container.push(d);
         }
      }
      function collation(g,ord,d){
         var result = {};
         //console.log(ord);
         if(!(typeof ord === "undefined")){
            if(!(typeof d[ord] === "undefined")){ 
               if(Object.prototype.toString.call(d[ord]).slice(8, -1) === "Object" || Object.prototype.toString.call(d[ord]).slice(8, -1) === "Array"){
                  console.log("Error: Object and Array can not set property");
                  return false; 
               }
               result["identity"] = d[ord]; 
            }
            if(typeof result["identity"] === "undefined"){
               return false; 
            }else{  
                result["attribute"] = new Array();
                result["degree"] = 0;
                result["indegree"] = 0;
                //console.log(result);
                return result; 
            }
         }
      }
      iterator(data);
      for(k = 0; k < container.length; k++){
         //console.log(order.node[l]);
         var node = collation(g,order,container[k]);
         if(node){ 
            _setidentity(g,node);
            for(n in container[k]){ 
               if(!(n === order)){ _set(g,container[k][n],node,n); }
            }
         }
      }
      //collation(g,order.edge);
      delete data,container;
  }
  function _edgeing(g,data,from,edge,prop){
    //console.log("_edgeing");
    var container = new Array();
    function iterator_e(d){
       //console.log(d);
       if(Object.prototype.toString.call(d).slice(8, -1) === "Object"){
          container.push(d);
          for(var n in d){
             iterator_e(d[n]);
          }
       }else if(Object.prototype.toString.call(d).slice(8, -1) === "Array"){
          //container.push(d);
          for(j = 0; j < d.length; j++){
             iterator_e(d[j]);
          }
       }else{
          container.push(d);
       }
    }
    function search(iden,prop){
      //console.log(prop);
      if(iden){
         var key = Object.keys(iden);
         //console.log(key[0]);
         for(k = 0 ; k < container.length ;k++){
            if((Object.prototype.toString.call(container[k]).slice(8, -1) === "Object") && prop && (iden[key[0]] === container[k][prop])){  
               //console.log("push");
               return true;
            }else if(iden[key[0]] === container[k]){
               return true;
            }
         }
         return false;
      }else{
         return false;
      }
    }
    
    iterator_e(data);
    var result = new Array();
    var from_i = -1;
    for(i = 0;i < g._vertices.length ;i++){
       if((typeof g._vertices[i].identity != "undefined") && (g._vertices[i].identity,from)){
          from_i = i;
          for(j = 0;j < g._vertices.length ;j++){
             if(search(g._vertices[j].identity,prop)){  result.push(j); }
          }
       }
     }
     if(!(from_i == -1)){
        //console.log(result);
        _linked(g,from_i,result,edge);
     }
     delete result;
     //console.log(linknode);
  }
  function _linked (g,parent,child,e){
        var node_p = g._vertices[parent];
        for(k = 0; k < child.length; k++){
           var chk = true;
           var node_c = g._vertices[child[k]];
           if(typeof g._vertices[parent][e] == "undefined"){
              g._vertices[parent][e] = new Array();
           }
           if(typeof g._vertices[child[k]][e] == "undefined"){
              g._vertices[child[k]][e] = new Array();
           }           
           for(d = 0; d < g._vertices[parent][e].length ; d++){
              if((g._vertices[parent][e][d] == node_c) || (g._vertices[child[k]][e][d] == node_p)){ chk = false; }
           }
           if(chk){
              //console.log(node);
              g._vertices[parent][e].push(node_c);
              g._vertices[child[k]][e].push(node_p);
              g._vertices[parent].degree++;
              g._vertices[parent].indegree++;
              g._vertices[child[k]].degree++;
              g._vertices[child[k]].indegree++;
           }
        }
  }
  function _setidentity(g,u){
      if(!(typeof u.identity === "undefined")){
       //console.log("pushdone:");
       //console.log(u);
       g._vertices.push(u);
    }
  }
  function check_gap(e,pt,g){
     //console.log(e);
     if(g._maptable === undefined){ return pt; }
     var co = g._maptable;
     if(co[pt]){
        //console.log(n);
        if(Object.prototype.toString.call(co[pt]).slice(8, -1) === "Array"){
           if(Object.prototype.toString.call(e[pt]).slice(8, -1) !== "Undefined"){ return pt; }
           for(var i = 0; i < co[pt].length;i++){
              //console.log(co[n][i]);
              if(e[co[pt][i]]){ return co[pt][i]; }
           }
        }
     }
     return pt;
  }
  function _set (g, u, v, e)
  {
    // add to vertex list if the degree is unknown
    if(Object.prototype.toString.call(u).slice(8, -1) === "Object" || Object.prototype.toString.call(u).slice(8, -1) === "Array"){
       //ëŒâûï\ÇégÇ¡ÇƒìùàÍÇ∑ÇÈÇ»ÇÁÇ±Ç±//
       var tmp = hash(e,"nil",true);
       v["attribute"].push(tmp);
       //v.degree++;
       g._vertices.push(tmp);
       //tmp.indegree++;
       var objnode = _graphite(u);
       for(j = 0; j < objnode.length; j++){
          for(p in objnode[j]){
             _set(g,objnode[j][p],tmp,p);
          }
       }
    }else if(!(u === v.identity)){
       //console.log("pushdone:");
       //console.log(u);
       g._vertices.push(hash(e,u));
       //u["attribute"].push(hash(e,v));
       v["attribute"].push(hash(e,u));
       //v.degree++;
    }
  }
  function _graphite(obj){
     var reslut = new Array();
     function iterator(d,p){
         //console.log(d);
         if(Object.prototype.toString.call(d).slice(8, -1) === "Object"){
            for(var n in d){
              // console.log(d[n] + " " + Object.prototype.toString.call(d[n]).slice(8, -1));
               iterator(d[n],n);
            }
         }else if(Object.prototype.toString.call(d).slice(8, -1) === "Array"){
            //container.push(d);
            for(j = 0; j < d.length; j++){
               iterator(d[j],j);
            }
         }else{
            reslut.push(hash(p,d));
         }
     }
     iterator(obj);
     //console.log(reslut);
     return reslut;
  }
  function _error(err){
     throw "Syntax Error";
  }
  // add to global scope
  if (typeof(window) !== 'undefined') {
    // browser
    window.Graph = Graph;
  } else if (typeof(require) !== 'undefined') {
    // commonjs
    exports.Graph = Graph;
  } else if (typeof(load) !== 'undefined') {
    // jsc
    return {
      "Graph": Graph
    };
  }
}());