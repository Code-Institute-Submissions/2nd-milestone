queue()
    .defer(d3.csv, "data/silicon.csv")
    .await(makeGraphs);
    
function makeGraphs(error, siliconData) {
    var ndx = crossfilter(siliconData);

    

   
    show_gender_balance(ndx);
    show_company_chart(ndx);
    show_count_select(ndx);
    show_race_select(ndx);
    show_job_chart(ndx);
    show_rank_distribution(ndx);


    dc.renderAll();
    
}


function show_gender_balance(ndx) {
var gender_dim = ndx.dimension(dc.pluck("gender"));
var gender_group = gender_dim.group();

    dc.pieChart('#gender-balance')
        .height(330)
        .radius(150)
        .transitionDuration(1500)
        .dimension(gender_dim)
        .group(gender_group);
        
}

function show_company_chart(ndx) {
    var company_dim = ndx.dimension(dc.pluck("company"));
    var company_group = company_dim.group();
    
    dc.barChart("#company-chart")
        .width(1700)
        .height(650)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(company_dim)
        .group(company_group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Company")
        .yAxis().ticks(50);
}

function  show_job_chart(ndx) {
    var job_dim = ndx.dimension(dc.pluck("job_category"));
    var job_group = job_dim.group();
    
    dc.barChart("#job-chart")
        .width(1700)
        .height(650)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(job_dim)
        .group(job_group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Careers")
        .yAxis().ticks(30);
}

function show_count_select(ndx) {
    var dim = ndx.dimension(dc.pluck("count"));
    var group = dim.group();
    
    dc.selectMenu("#count-select")
        .dimension(dim)
        .group(group)
}

function show_race_select(ndx) {
    var dim = ndx.dimension(dc.pluck("race"));
    var group = dim.group();
    
    dc.selectMenu("#race-select")
        .dimension(dim)
        .group(group)
}

function show_rank_distribution(ndx) {
    
    function rankByGender(dimension, job_category) {
        return dimension.group().reduce(
            function (p, v) {
                p.total++;
                if(v.job_category == job_category) {
                    p.match++;
                }
                return p;
            },
            function (p, v) {
                p.total--;
                if(v.job_category == job_category) {
                    p.match--;
                }
                return p;
            },
            function () {
                return {total: 0, match: 0};
            }
        );
    }
    
    var dim = ndx.dimension(dc.pluck("gender"));
    var profByGender = rankByGender(dim, "Administrative support");
    var asstProfByGender = rankByGender(dim, "Professionals");
    var assocProfByGender = rankByGender(dim, "Craft workers");
    var assoc1ProfByGender = rankByGender(dim, "Totals");
    
    dc.barChart("#rank-distribution")
        .width(400)
        .height(300)
        .dimension(dim)
        .group(profByGender, "Executive/Senior")
        .stack(asstProfByGender, "Professionals")
        .stack(assocProfByGender, "Craft workers")
        .stack(assoc1ProfByGender, "Totals")
        .valueAccessor(function(d) {
            if(d.value.total > 100) {
                return (d.value.match / d.value.total) * 100;
            } else {
                return 0;
            }
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .legend(dc.legend().x(320).y(20).itemHeight(15).gap(5))
        .margins({top: 10, right: 100, bottom: 30, left: 30});
        
}


