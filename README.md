# dataChart
A data explorer to turn a collection of data into a chart


Work in progress.

To see a demo:
1. Clone the repo
2. Run `npm install && npm run build`.
3. In the dist folder, create an index.html file and insert the standard template:
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dataChart</title>
    <!-- Using bootstrap for styling -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap-theme.min.css"
        integrity="sha384-6pzBo3FDv/PJ8r2KRkGHifhEocL+1X2rVCTTkUfGk7/0pbek5mMa1upzvWbrUbOZ" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
        integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd"
        crossorigin="anonymous"></script>
</head>

<body>
    <div class='container'>
        <div class='row'>
            <!-- Create an element with an id where the graph is to be drawn -->
            <div id='graph-wrapper' class='col-sm-12'></div>
        </div>
    </div>
    
    <!-- include the dataChart.js library -->
    <script src="dataChart.js"></script>
    <script>
        const data = [{ id: 1, name: 'array of objects', height: 13, weight: 26, foo: { numInt: 32 } }];

        // Instantiate the dataChart object with data and the id of the element where the graph is to be drawn
        let myChart = new dataChart.graph(data, 'graph-wrapper');
        myChart.draw();
    </script>
</body>

</html>
```
4. Open a browser and navigate to localhost/<path_to_dataChart>/dist/index.html.
