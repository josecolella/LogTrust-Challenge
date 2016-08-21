'use strict';

$(function() {

    var categorizedData = {};
    var datesSet = new Set();
    var datesList = [];
    var series = [];
    var cleanSeries = [];
    // Fetch first chart data, clean data, and push into array
    $.ajax({
        url: 'https://20e9cec27e7d554b0e22256605c416c6a42162a3-www.googledrive.com/host/0B6u6_2LrMeVsdFFTOWcxUUtjdW8',
        type: 'GET',
        async: false,
        dataType: 'json',
    }).success(function(data) {
        data.forEach(function(elem) {
            let date = new Date(elem.d);
            let format = function(str) {
                return str.length == 1 ? '0' + str : str
            };
            let formattedDate = date.getFullYear() + '-' + format(date.getMonth().toString()) + '-' + format(date.getDay().toString());

            series.push({
                date: formattedDate,
                category: elem.cat.toUpperCase(),
                value: elem.value
            });
        });
    });


    //Fetch second chart data, clean data and push into array
    $.ajax({
        url: 'https://5d819f05a08a04065062fdf5bdd422e3aaa0e301-www.googledrive.com/host/0B6u6_2LrMeVsc3NkekQzVHBqV1E',
        type: 'GET',
        async: false,
        dataType: 'json',
    }).success(function(data) {
        data.forEach(function(elem) {
            series.push({
                date: elem.myDate,
                category: elem.categ.toUpperCase(),
                value: elem.val
            });
        });
    });



    //Fetch third chart data, clean data, and push to list
    $.ajax({
        url: 'https://668c4a9f6a799371a9af32d324bff1f6d72a5566-www.googledrive.com/host/0B6u6_2LrMeVscUZ1VEZDc0p1bDg',
        type: 'GET',
        async: false,
        dataType: 'json'
    }).success(function(data) {
        let re = /.*([0-9]{4}-[0-9]{2}-[0-9]{2}).*#([^#]+)#.*/;
        data.forEach(function(rawElem) {
            let regexData = rawElem.raw.match(re);

            series.push({
                date: regexData[1],
                category: regexData[2].toUpperCase(),
                value: rawElem.val
            });
        });
    });

    //Structure series into {category: {date: value}} structure and add value for same datea
    series.forEach(function(elem) {
        let category = elem.category;
        let date = elem.date;
        let value = elem.value;

        datesSet.add(date);
        if (categorizedData[category] === undefined) {
            categorizedData[category] = {};
        }
        if (categorizedData[category].hasOwnProperty(date)) {
            categorizedData[category][date] += value;
        } else {
            categorizedData[category][date] = value;
        }
    });

    //Get dates, use a set as no duplicates are allowed
    datesSet.forEach(function(elem) {
        datesList.push(elem);
    });
    datesList.sort();

    // Set up clean series
    function getCleanSeriesData(categorizedData) {
        let cleanSeries = [];

        for (var category in categorizedData) {
            let values = [];
            for (var date in categorizedData[category]) {
                values.push(categorizedData[category][date]);
            }
            cleanSeries.push({
                name: category,
                data: values
            })
        }
        return cleanSeries;
    }

    cleanSeries = getCleanSeriesData(categorizedData);

    //Create line chart
    $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Line Chart'
        },
        xAxis: {
            categories: datesList
        },
        yAxis: {
            title: {
                text: 'Value'
            }
        },
        series: cleanSeries
    });

    //Create pie chart
    $('#container2').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Pie Chart'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y} ',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: cleanSeries.map(function(elem) {
                let sumVal = elem.data.reduce(function(x, y) {
                    return x + y;
                });
                return {
                    name: elem.name,
                    y: sumVal
                }
            })
        }]
    });
});
