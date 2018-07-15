queue()
    .defer(d3.csv, "data/50bestrestaurants.csv")
    .await(makeGraphs);
    
function makeGraphs(error, bestrestaurantsData) {
    var ndx = crossfilter(bestrestaurantsData);
    
    bestrestaurantsData.forEach(function(d){
         d.Longitude = parseInt(d["Longitude"]);
         d.Latitude = parseInt(d["Latitude"]);
    });
    

  
   var eDim = ndx.dimension(dc.pluck("City"));
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
    var total_spend_per_store = name_dim.group();
        dc.pieChart('#h-t-o')
            .height(230)
            .radius(800)
            .innerRadius(70)
            .transitionDuration(1500)
            .ordinalColors(['#c78752','#964B00'])
            .dimension(name_dim)
            .group(total_spend_per_store);
            
            
            
    var name_dim = ndx.dimension(dc.pluck('Name'));
    var total_spend_per_store = name_dim.group();
        dc.pieChart('#per-store-chart')
            .height(230)
            .radius(800)
            .innerRadius(70)
            .transitionDuration(1500)
            .ordinalColors(['#c78752','#964B00'])
            .dimension(name_dim)
            .group(total_spend_per_store);
  
  
  

  
 /* rowchart */          

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
        
        
    var dim = ndx.dimension(dc.pluck("Ranking"));
    var group = dim.group();
    
    dc.selectMenu("#race-select")
        .dimension(dim)
        .group(group)


    dc.renderAll();
}
            
            

            
            
    