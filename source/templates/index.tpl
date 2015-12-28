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
    };
  </script>
  <script src="<?php echo $config->urls->templates?>assets/libs/vendor/plugins.images.min.js" async=""></script>
</head>

<body>

  <div class="page">

    <header role="banner" class="page-head page-head--banner">
      <div class="grid">
        <div class="grid__cell u-1/4 u-1/1-palm">
          <h1 class="logo">Logo</h1>
        </div>
        <div class="grid__cell u-3/4 u-1/1-palm">
          <nav role="navigation">
            <ul class="list-inline-block list--small">
              <?php
                $root = $pages->get("/");
                $children = $root->children();
                $children->prepend($root);
                foreach($children as $item){
                  if ($page->id === $item->id) {
                    echo "<li class='current'>{$item->title}</li>\n";
                  } else {
                    echo "<li><a href='{$item->url}'>{$item->title}</a></li>\n";
                  }
                }
              ?>
            </ul>
          </nav>
        </div>
      </div>

      <ul class="c-breadcrumb c-breadcrumb--small list-inline-block">
        <?php breadcrumb(); ?>
      </ul>

    </header> <!-- /role[header] -->

    <main role="main" class="page-content">

      <?php
      if ($p->layout) {
        include("./markup/layouts/{$p->layout}.php");
      } else {
        include("./markup/layouts/default.php");
      }
      ?>

    </main> <!-- /main -->

    <footer role="contentinfo" class="page-footer page-footer--contentinfo">
      <ul class="list-inline-block list--tiny-vertical list--skip-vertical">
        <?php languageListing($languages); ?>
      </ul>
    </footer><!-- /role[footer] -->
  </div>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="<?php echo $config->urls->templates?>assets/libs/vendor/jquery.min.js"><\/script>');</script>
  <script src="<?php echo $config->urls->templates?>assets/libs/vendor/plugins.min.js"></script>
  <script src="<?php echo $config->urls->templates?>assets/libs/base.min.js"></script>

  <!-- Piwik -->
<!-- 	<script type="text/javascript">
    var _paq = _paq || [];
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);

    (function() {
      var u=(("https:" == document.location.protocol) ? "https" : "http") + "://piwik.olafgleba.de/";
      _paq.push(["setTrackerUrl", u+"piwik.php"]);
      _paq.push(["setSiteId", "2"]);
      var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
      g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
    })();
  </script> -->
  <!-- End Piwik Code -->

</body>
</html>
