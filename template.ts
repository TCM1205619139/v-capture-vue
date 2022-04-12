const createTemplate = ({attributes, bundle, files, publicPath, title}, fileName='') => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" type="text/css" href="${publicPath}${fileName}.css">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="${publicPath}${fileName}.js"></script>
</body>
</html>`
}
// }

export default createTemplate