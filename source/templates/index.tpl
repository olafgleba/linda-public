<?php namespace ProcessWire; ?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title><?php echo ($page->seo_meta_title) ? $page->seo_meta_title : $page->title ?> <?php echo ($page->seo_meta_sitename) ? "| ".$page->seo_meta_sitename : "| ".$config_sitename ?></title>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="robots" content="<?php echo ($page->seo_meta_robots) ? $page->seo_meta_robots : "index, follow" ?>" />
  <meta name="description" content="<?php echo ($page->seo_meta_description) ? $page->seo_meta_description : $config_description; ?>" />
  <meta name="author" content="Olaf Gleba, <og@olafgleba.de>" />
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="canonical" href="<?php echo $config_canonical_url; ?>">
  <?php buildHreflang($languages); ?>

  <link rel="stylesheet" href="<?php echo $config->urls->templates?>assets/css/styles.min.css">

  <script src="<?php echo $config->urls->templates?>assets/libs/vendor/plugins.images.min.js" async=""></script>

  <script src="//use.typekit.net/tos1rrw.js"></script>
  <script>try{Typekit.load();}catch(e){}</script>
</head>

<body>

  <div class="page">

    <header role="banner" class="page-head page-head--banner">
      <div class="grid">
        <div class="grid__cell u-1of4 u-1of1-palm">
          <h1 class="logo">Logo</h1>
        </div>
        <div class="grid__cell u-3of4 u-1of1-palm">
          <nav>
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

      <ul class="c-breadcrumb">
        <?php breadcrumb(); ?>
      </ul>

    </header> <!-- /role[header] -->

    <main role="main" class="page-content">

      <?php
      if ($page->layout) {
        include("./markup/layouts/{$page->layout}.php");
      } else {
        include("./markup/layouts/default.php");
      }
      ?>

    </main> <!-- /main -->

    <footer id="footer" role="contentinfo" class="page-footer page-footer--contentinfo">
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
