queue()
    .defer(d3.csv, "data/50bestrestaurants.csv")
    .await(makeGraphs);
    
function makeGraphs(error, bestrestaurantsData) {
    var ndx = crossfilter(bestrestaurantsData);
    
    bestrestaurantsData.forEach(function(d){
         d.Longitude = parseInt(d["Longitude"]);
         d.Latitude = parseInt(d["Latitude"]);
    });
    

/* Ranking Selector*/

 var dim = ndx.dimension(dc.pluck("Ranking"));
    var group = dim.group();
    
    dc.selectMenu("#rank-select")
        .dimension(dim)
        .group(group)


/*Dimensions, Groups and PieCharts */
  
  
    var eDim = ndx.dimension(dc.pluck("City"));
    var longDim = ndx.dimension(function(d){
        return [d.Latitude, d.Longitude];
    });
    
    
    var longGroup = longDim.group();
        
        dc.pieChart('#longlang-chart')
            .height(300)
            .radius(780)
            .innerRadius(60)
            .transitionDuration(100)
            .ordinalColors(['#c78752','#964B00'])
            .dimension(longDim)
            .group(longGroup);
            
            
    var name_dim = ndx.dimension(dc.pluck('City'));
    var nameGroup = name_dim.group();
        dc.pieChart('#city-names')
            .height(300)
            .radius(780)
            .innerRadius(70)
            .transitionDuration(1500)
            .ordinalColors(['#c78752','#964B00'])
            .dimension(name_dim)
            .group(nameGroup);
            
            
        var store_dim = ndx.dimension(dc.pluck('Name'));
        var total_spend_per_store = store_dim.group().reduceSum(dc.pluck('Year'));
        dc.pieChart('#name-chart')
            .height(300)
            .radius(780)
            .transitionDuration(1500)
            .ordinalColors(['#c78752','#964B00'])
            .dimension(store_dim)
            .group(total_spend_per_store);
            

  
 /*Dimension, Groups and barChart*/          

   var eDim = ndx.dimension(dc.pluck("Country"));
   var experienceSalaryGroup = eDim.group();
        dc.barChart("#country-chart")
        .width(1100)
        .height(650)
        .margins({top: 30, right: 30, bottom: 40, left: 60})
        .dimension(eDim)
        .group(experienceSalaryGroup)
        .ordinalColors(['#a97947'])
        .transitionDuration(800)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
   

    dc.renderAll();
}
            
            

            
            
    