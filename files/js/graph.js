queue()
    .defer(d3.csv, "data/50bestrestaurants.csv")
    .await(makeGraphs);
    
function makeGraphs(error, bestrestaurantsData) {
    var ndx = crossfilter(bestrestaurantsData);
    
   bestrestaurantsData.forEach(function(d){
         d.Ranking = parseInt(d["Ranking"]);
         d.Longitude = parseInt(d["Longitude"]);
         d.Latitude = parseInt(d["Latitude"]);
    });
    
    


    var dim = ndx.dimension(dc.pluck("Country"));  
    var group = dim.group();
    
    dc.selectMenu("#count-select")
        .dimension(dim)
        .group(group)




    var eDim = ndx.dimension(dc.pluck("Ranking"));
    var experienceDim = ndx.dimension(function(d){
        return [d.Latitude, d.Longitude];
    });
    
    
    var experienceSalaryGroup = experienceDim.group();
        
        dc.pieChart('#per-name-chart')
            .height(230)
            .radius(800)
            .innerRadius(70)
            .transitionDuration(1500)
            .ordinalColors(['#c78752','#964B00'])
            .dimension(experienceDim)
            .group(experienceSalaryGroup);
            

       var name_dim = ndx.dimension(dc.pluck('City'));
      var experienceDim = ndx.dimension(function(d){
        return [d.Ranking];
    });
    
    
    var experienceSalaryGroup = experienceDim.group();
        dc.pieChart('#h-t-o')
            .height(230)
            .radius(800)
            .innerRadius(70)
            .transitionDuration(1500)
            .ordinalColors(['#c78752','#964B00'])
            .dimension(experienceDim)
            .group(experienceSalaryGroup);
            
            
        var store_dim = ndx.dimension(dc.pluck('Name'));
        var total_spend_per_store = store_dim.group().reduceSum(dc.pluck('Year'));
        dc.pieChart('#per-store-chart')
            .height(230)
            .radius(800)
            .innerRadius(70)
            .transitionDuration(1500)
            .ordinalColors(['#c78752','#964B00'])
            .dimension(store_dim)
            .group(total_spend_per_store);
            
            
            

            
   var eDim = ndx.dimension(dc.pluck("Name"));
    var experienceDim = ndx.dimension(function(d){
        return [d.Latitude, d.Longitude];
    });
    
    var experienceSalaryGroup = experienceDim.group();
        dc.rowChart("#country-chart")
        .width(800)
        .height(650)
        .margins({top: 30, right: 30, bottom: 40, left: 60})
        .dimension(experienceDim)
        .group(experienceSalaryGroup)
        .ordinalColors(['#a97947'])
        .transitionDuration(800)
        .x(d3.scale.ordinal())
        .elasticX(true)
        .xAxis().ticks(30);
        
    var state_dim = ndx.dimension(dc.pluck('Ranking'));
    var total_spend_per_state = state_dim.group().reduceSum(dc.pluck('Year'));
        dc.rowChart("#rank-chart")
        .width(800)
        .height(650)
        .margins({top: 30, right: 30, bottom: 40, left: 60})
        .dimension(state_dim)
        .group(total_spend_per_state)
        .ordinalColors(['#a97947'])
        .transitionDuration(800)
        .x(d3.scale.ordinal())
        .elasticX(true)
        .xAxis().ticks(30);
        
        


        
    dc.renderAll();
}
            
            

            
            
    