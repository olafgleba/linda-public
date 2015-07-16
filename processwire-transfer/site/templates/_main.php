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

  <link rel="stylesheet" href="<?php echo $config->urls->templates?>assets/css/styles.min.css">


  <script src="//use.typekit.net/bzi7ull.js"></script>
  <script>try{Typekit.load();}catch(e){}</script>

  <script>
    window.lazySizesConfig = {
      addClasses: true
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
          <ul class="list-inline-block list--large">
            <?php
              foreach($pages->find('template=single|abstractions|home') as $item){
                if ($page->name === $item->name) {
                  echo "	<li class='current'>{$item->title}</li>\n\t\t\t";
                } else {
                  echo "	<li><a href='{$item->url}'>{$item->title}</a></li>\n";
                }
              }
            ?>
          </ul>
          </nav>
        </div>
      </div>
    </header> <!-- /role[header] -->

    <main role="main" class="page-content">
      <div class="grid">
        <div class="grid__cell u-3/4 u-1/1-palm">
          <article>
            <h1 class="section-heading"><?php echo $headline; ?></h1>
            <div class="section-body">
              <?php echo $content; ?>

            </div>
          </article>
        </div>
        <div class="grid__cell u-1/4 u-1/1-palm">
          <aside class="sidebar u-align--right">
            <p>aside</p>
          </aside>
        </div>
      </div>
    </main> <!-- /main -->

    <footer role="contentinfo" class="page-footer page-footer--contentinfo">
      <ul class="nav nav--contentinfo list-bare">
        <?php
          foreach($pages->find('template=single') as $directory){
            if ($page->name === $directory->name) {
              echo "	<li class='current'>{$directory->title}</li>\n\t\t\t";
            } else {
              echo "	<li><a href='{$directory->url}'>{$directory->title}</a></li>\n\t\t\t";
            }
          }
        ?>
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
