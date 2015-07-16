<!DOCTYPE html>
<html lang="de" class="js">
<head>
  <meta charset="utf-8">
  <title><?php echo $page->title; ?></title>
  <meta name="robots" content="index, follow" />
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <?php include('./includes/head.inc.php'); ?>
  <?php include('./includes/scripts.top.inc.php'); ?>
</head>

<body id="totop">
  <div class="page">

      <h1>Lists</h1>

      <h2>Modifier:</h2>
      <p>Diese Modifier sind auf alle Listenkomponenten (<i>außer wo angemerkt</i>) anwendbar.</p>
      <ul class="list-bare">
        <li><code>.list--align-center</code></li>
        <li><code>.list--align-right</code></li>
        <li><code>.list--tiny</code></li>
        <li><code>.list--small</code></li>
        <li><code>.list--large</code></li>
        <li><code>.list--huge</code></li>
      </ul>

      <div class="grid">
        <div class="grid__cell u-1/1">
          <h2>.list-bare</h2>
          <p> <code>.list-bare</code> wird i.d.R. nicht direkt eingsetzt, sondern dient als Ableitung für anderen Listen Komponenten.</p>
          <ul class="list-bare">
            <li>item</li>
            <li class="list-bare__item">item 2</li>
            <li>item 3</li>
          </ul>
        </div>

        <div class="grid__cell u-1/1">
          <h2>.list-inline-block</h2>
          <p> <code>.list-inline-block</code> richtet Zeilen horizontal aus.</p>
          <ul class="list-inline-block">
            <li>item</li>
            <li class="list-inline-block__item">item 2 hier was längeres um zu schauen ob und wann das umbricht</li>
            <li>item 3</li>
          </ul>
        </div>
        <div class="grid__cell u-1/1">
          <h2>.list-stacked</h2>
          <p> <code>.list-stacked</code> richtet Zeilen als Block vertikal aus.</p>
          <ul class="list-stacked">
            <li><a href="#">Link</a></li>
            <li class="list-stacked__item">item 2</li>
            <li>item 3</li>
          </ul>
        </div>

        <div class="grid__cell u-1/1">
          <h2>.list-table</h2>
          <p> <code>.list-table</code> richtet Zeilen horizontal als Pseudo-Tabellenzeile aus. Die Zeilen nehmen die ganze Viewport-Breite ein.</p>
          <ul class="list-table list-table--blockylinks">
            <li class="list-table__item"><a href="#">item</a></li>
            <li><a href="#">item 2 hier was längeres mit einem Eigenschaftswort um zu schauen ob und wann das umbricht</a></li>
            <li class="list-table__item">item 3</li>
          </ul>
        </div>

        <div class="grid__cell u-1/1">
          <h2>.list-chart</h2>
          <p> <code>.list-chart</code> stellt jeweils zwei listenzeilen (label/value) gegenüber. Sinnvoll für Preisangaben etc.. Auch (zumeist sinnvoller) auf <code>dl</code>-Listen anwendbar. Align Modifier (e.g. <code>--align-xxx</code>) können hier nicht genutzt werden. Die Zeilen nehmen die ganze Viewport-Breite ein.</p>
          <ul class="list-chart">
            <li class="list-chart__label">Label</li>
            <li class="list-chart__value">999 €</li>
            <li class="list-chart__label">Label</li>
            <li class="list-chart__value">999 €</li>
          </ul>
        </div>

      </div>


      <h1>respimg / layzload</h1>
      <p>Hinweis für alte Hirne: Welches Bilder initial geladen wird, ist nicht abhängig vom Browser-Viewport, sondern bezieht sich immer auf den verhandenen Platz im Kontext(!) des Bildes. Bspw. wird die kleinere Version geladen, wenn das Bild einer Grid-Spalte steht, die bei größeren Viewports nur ein Drittel des Platzes bekommen sollen. Ist die größtmögliche Source einmal geladen, wird diese für alle Ansichten verwendet, resp. die kleineren Sourcen werden nicht nachgeladen (gut so!).</p>

      <div class="grid grid--align-center">
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <img data-sizes="auto" src="http://placehold.it/480x320/FF4600/000000?text=fallback" data-srcset="http://placehold.it/480x320/FF4600/000000?text=480x320+/+9.26 480w, http://placehold.it/650x433/8ED42B/000000?text=650x433+/+12.55 650w" alt="" class="lazyload" />
        </div>
      </div>


      <h1>Grid</h1>

      <div class="grid grid--align-center">
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>Second column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>First column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>
            <a class="test" href="#">
              <svg class="icon icon-twitter" role="img" title="Twitter">
                <use xlink:href="<?php echo $config->urls->templates?>assets/img/icon-sprite.svg#icon-twitter" />
              </svg>
              Third column
            </a>
          </div>
        </div>
      </div>


      <div class="grid grid--align-right">
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>First column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>Second column</div>
        </div>
        <div class="grid__cell u-1/2-lap-and-up u-1/1-palm">
          <div>Third column</div>
        </div>
      </div>

      <h1>grid--align-middle</h1>
      <div class="grid grid--align-middle">
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>First column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div style="min-height: 5em;">Second column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>Third column</div>
        </div>
      </div>

      <h1>grid--align-bottom</h1>
      <div class="grid grid--with-gutter grid--align-bottom">
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>First column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div style="min-height: 5em;">Second column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>Third column</div>
        </div>
      </div>

      <h1>grid__cell--center</h1>
      <div class="grid">
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>First column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>Second column</div>
        </div>
        <div class="grid__cell grid__cell--center u-1/3-lap-and-up u-1/1-palm">
          <div>Third column</div>
        </div>
      </div>


      <h1>grid--gutter</h1>
      <div class="grid grid--gutter grid--gutter--large">
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>First column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div style="min-height: 5em;">Second column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>Third column</div>
        </div>
      </div>

      <h1>grid--gutter, nested grid</h1>
      <div class="grid grid--gutter grid--gutter--large">
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>First column</div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div style="min-height: 5em;">Second column</div>
          <div class="grid">
            <div class="grid__cell u-1/2-lap-and-up u-1/1-palm">
              <div>First column</div>
            </div>
            <div class="grid__cell u-1/2-lap-and-up u-1/1-palm">
              <div style="min-height: 5em;">Second column</div>
            </div>
          </div>
        </div>
        <div class="grid__cell u-1/3-lap-and-up u-1/1-palm">
          <div>Third column</div>
        </div>
      </div>


      <h1>Button</h1>

      <div class="grid">
        <div class="grid__cell u-1/1">
          <a href="#" class="button">.button</a>
        </div>
        <div class="grid__cell u-1/1">
          <a href="#" class="button button--tiny">.button--tiny</a>
        </div>
        <div class="grid__cell u-1/1">
          <a href="#" class="button button--small">.button--small</a>
        </div>
        <div class="grid__cell u-1/1">
          <a href="#" class="button button--large">.button--large</a>
        </div>
        <div class="grid__cell u-1/1">
          <a href="#" class="button button--huge">.button--huge</a>
        </div>
      </div>

      <div class="grid">
        <div class="grid__cell">
          <a href="#" class="button button--pill">.button--pill</a>
        </div>
      </div>

      <div class="grid">
        <div class="grid__cell">
          <a href="#" class="button button--large button--full">.button--full</a>
        </div>
      </div>

      <h1>Button Groups</h1>
      <div class="grid">
        <div class="grid__cell">
          <ul class="button-group button-group--horizontal button-group--collapse">
            <li class="button-group__item"><a href="#" class="button">Button</a></li>
            <li class="button-group__item"><a href="#" class="button">Button</a></li>
            <li class="button-group__item"><a href="#" class="button">Button</a></li>
          </ul>
        </div>
      </div>

      <div class="grid">
        <div class="grid__cell">
          <ul class="button-group button-group--collapse">
            <li class="button-group__item"><a href="#" class="button">Button</a></li>
            <li class="button-group__item"><a href="#" class="button">Button</a></li>
            <li class="button-group__item"><a href="#" class="button">Button</a></li>
          </ul>
        </div>
      </div>


      <h1>Table</h1>

      <div class="grid">
        <div class="grid__cell u-1/1">

            <!-- <table class="table table--border table--large" data-tablesaw-mode="stack"> -->

            <table class="table table--border tablesaw tablesaw-stack" data-tablesaw-mode="stack">
              <thead>
                <tr>
                  <th>Saison</th>
                  <th>Zeiträume</th>
                  <th>Preise</th>
                </tr>
              <tbody>
                <tr>
                  <td>Hauptsaison (Saison A)</td>
                  <td>01.01.-07.01. (Neujahr), 30.03.-12.04. (Ostern), 01.05. - 31.10. (Sommer) und 23.12.-31.12. (Weihnachten/Silvester)</td>
                  <td>€ 2,80 pro Person und Tag</td>
                </tr>
                <tr>
                  <td>Nebensaison (Saison B)</td>
                  <td>08.01.-29.03., 13.04.-30.04. und 01.11.-22.12.</td>
                  <td>€ 1,80 pro Person und Tag</td>
                </tr>
                <tr>
                  <td>Nebensaison (Saison B)</td>
                  <td>08.01.-29.03., 13.04.-30.04. und 01.11.-22.12.</td>
                  <td>€ 1,80 pro Person und Tag</td>
                </tr>
                <tr>
                  <td>Nebensaison (Saison B)</td>
                  <td>08.01.-29.03., 13.04.-30.04. und 01.11.-22.12.</td>
                  <td>€ 1,80 pro Person und Tag</td>
                </tr>
              </tbody>
            </table>

        </div>
      </div>


      <h1>Owl Carousel</h1>
      <div id="owl-demo" class="owl-carousel">
        <div class="item"><h1>1</h1></div>
        <div class="item"><h1>2</h1></div>
        <div class="item"><h1>3</h1></div>
        <div class="item"><h1>4</h1></div>
        <div class="item"><h1>5</h1></div>
        <div class="item"><h1>6</h1></div>
        <div class="item"><h1>7</h1></div>
        <div class="item"><h1>8</h1></div>
        <div class="item"><h1>9</h1></div>
        <div class="item"><h1>10</h1></div>
        <div class="item"><h1>11</h1></div>
        <div class="item"><h1>12</h1></div>
        <div class="item"><h1>13</h1></div>
        <div class="item"><h1>14</h1></div>
        <div class="item"><h1>15</h1></div>
        <div class="item"><h1>16</h1></div>
        <div class="item"><h1>17</h1></div>
        <div class="item"><h1>18</h1></div>
        <div class="item"><h1>19</h1></div>
        <div class="item"><h1>20</h1></div>
      </div>

      <div id="owl-demo2" class="owl-carousel-single">
        <div class="item"><img src="http://placehold.it/480x320" alt="The Last of us"></div>
        <div class="item"><img src="http://placehold.it/480x320" alt="GTA V"></div>
        <div class="item"><img src="http://placehold.it/480x320" alt="Mirror Edge"></div>
      </div>

      <p><a href="#totop" class="button">nach oben</a></p>

  </div>

<?php include('./includes/scripts.bottom.inc.php'); ?>

</body>
</html>
