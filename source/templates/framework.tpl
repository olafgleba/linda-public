<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title><?php echo $title; ?></title>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="robots" content="index, follow" />
  <meta name="description" content="" />
  <meta name="author" content="Olaf Gleba, <og@olafgleba.de>" />
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="canonical" href="<?php echo $canonical_url; ?>">
  <link rel="stylesheet" href="<?php echo $config->urls->templates?>assets/css/styles.min.css">

  <script src="//use.typekit.net/bzi7ull.js"></script>
  <script>try{Typekit.load();}catch(e){}</script>

  <script>
    window.lazySizesConfig = window.lazySizesConfig || {};
    window.lazySizesConfig.expand = 100;
  </script>
  <script src="<?php echo $config->urls->templates?>assets/libs/vendor/plugins.images.min.js" async=""></script>
</head>

<body>

  <div class="page">

    <main role="main" class="page-content">

      <?php
      if ($page->layout) {
        include("./markup/layouts/{$page->layout}.php");
      } else {
        include("./markup/layouts/default.php");
      }
      ?>

    </main> <!-- /main -->

  </div>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="<?php echo $config->urls->templates?>assets/libs/vendor/jquery.min.js"><\/script>');</script>
  <script src="<?php echo $config->urls->templates?>assets/libs/vendor/plugins.min.js"></script>
  <script src="<?php echo $config->urls->templates?>assets/libs/base.min.js"></script>

</body>
</html>
