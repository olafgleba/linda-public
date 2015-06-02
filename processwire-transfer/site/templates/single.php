<!DOCTYPE html>
<html lang="de">
<head>
	<meta charset="utf-8">
	<title><?php echo $page->title; ?></title>
	<meta name="robots" content="index, follow" />
<?php include('./includes/head.inc.php'); ?>
<?php include('./includes/scripts.top.inc.php'); ?>
</head>

<body>

	<div class="page">

		<header role="banner">
			<div class="layout layout--middle">
				<div class="layout__item 1/4 palm-1/1">
					<a href="<?php echo $config->urls->root; ?>" title="Zur Startseite">
						<h1 class="logo">Logo</h1>
					</a>
				</div><!--
				--><div class="layout__item 3/4 palm-1/1">
				<nav role="navigation">
					<ul class="nav list-inline">
						<?php include('./includes/nav.inc.php'); ?>
					</ul>
					</nav>
				</div>
			</div>
		</header> <!-- /role[header] -->

		<main role="main" class="page-content">
			<div class="layout">
				<div class="layout__item 3/4 palm-1/1">
					<article class="content">
						<h1 class="section-heading"><?php echo $page->title; ?></h1>
						<div class="section-body">
							<?php echo $page->body; ?>
						</div>
					</article>
				</div><!--
				--><div class="layout__item 1/4 palm-1/1">
					<aside class="sidebar u-align--right">
						<p>aside</p>
					</aside>
				</div>
			</div>
		</main> <!-- /main -->

		<footer role="contentinfo">
			<ul class="nav nav--contentinfo list-bare">
				<?php include('./includes/footer.inc.php'); ?>
			</ul>
		</footer><!-- /role[footer] -->
	</div>

<?php include('./includes/scripts.bottom.inc.php'); ?>

</body>
</html>