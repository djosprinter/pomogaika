<?php
/**
 * @package		Joomla.Administrator
 * @subpackage	Templates.hathor
 * @copyright	Copyright (C) 2005 - 2012 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 * @since		1.6
 */

// no direct access
defined('_JEXEC') or die;

jimport('joomla.filesystem.file');

$app	= JFactory::getApplication();
$lang = JFactory::getLanguage();
$file = 'language/'.$lang->getTag().'/'.$lang->getTag().'.css';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo  $this->language; ?>" lang="<?php echo  $this->language; ?>" dir="<?php echo  $this->direction; ?>">
<head>
<jdoc:include type="head" />

<!-- Load system style CSS -->
<link rel="stylesheet" href="templates/system/css/system.css" type="text/css" />

<!-- Load Template CSS -->
<link href="templates/<?php echo  $this->template ?>/css/template.css" rel="stylesheet" type="text/css" />

<!-- Load additional CSS styles for colors -->
<?php
	if (!$this->params->get('colourChoice')) :
		$colour = 'standard';
	else :
		$colour = htmlspecialchars($this->params->get('colourChoice'));
	endif;
?>
<link href="templates/<?php echo $this->template ?>/css/colour_<?php echo $colour; ?>.css" rel="stylesheet" type="text/css" />

<!-- Load additional CSS styles for rtl sites -->
<?php if ($this->direction == 'rtl') : ?>
	<link href="templates/<?php echo  $this->template ?>/css/template_rtl.css" rel="stylesheet" type="text/css" />
	<link href="templates/<?php echo $this->template ?>/css/colour_<?php echo $colour; ?>_rtl.css" rel="stylesheet" type="text/css" />
<?php endif; ?>

<!-- Load specific language related css -->
<?php if (JFile::exists($file)) : ?>
	<link href="<?php echo $file ?>" rel="stylesheet" type="text/css" />
<?php  endif; ?>

<!-- Load additional CSS styles for bold Text -->
<?php if ($this->params->get('boldText')) : ?>
	<link href="templates/<?php echo $this->template ?>/css/boldtext.css" rel="stylesheet" type="text/css" />
<?php  endif; ?>

<!-- Load additional CSS styles for Internet Explorer -->
<!--[if IE 8]>
	<link href="templates/<?php echo  $this->template ?>/css/ie8.css" rel="stylesheet" type="text/css" />
<![endif]-->
<!--[if IE 7]>
	<link href="templates/<?php echo  $this->template ?>/css/ie7.css" rel="stylesheet" type="text/css" />
<![endif]-->
<!--[if lte IE 6]>
	<link href="templates/<?php echo  $this->template ?>/css/ie6.css" rel="stylesheet" type="text/css" />
<![endif]-->

<!-- Load Template JavaScript -->
<script type="text/javascript" src="templates/<?php  echo  $this->template  ?>/js/template.js"></script>

</head>
<body id="minwidth" class="cpanel-page">
<div id="containerwrap">

	<!-- Header Logo -->
	<div id="header">

		<!-- Site Title and Skip to Content -->
		<div class="title-ua">
			<h1 class="title"><?php echo $this->params->get('showSiteName') ? $app->getCfg('sitename') . " " . JText::_('JADMINISTRATION') : JText::_('JADMINISTRATION'); ?></h1>
			<div id="skiplinkholder"><p><a id="skiplink" href="#skiptarget"><?php echo JText::_('TPL_HATHOR_SKIP_TO_MAIN_CONTENT'); ?></a></p></div>
      	</div>

	</div><!-- end header -->

	<!-- Main Menu Navigation -->
	<div id="nav">
		<div id="module-menu">
			<h2 class="element-invisible"><?php echo JText::_('TPL_HATHOR_MAIN_MENU'); ?></h2>
			<jdoc:include type="modules" name="menu" />
		</div>
		<div class="clr"></div>
	</div><!-- end nav -->

	<!-- Status Module -->
	<div id="module-status">
		<jdoc:include type="modules" name="status"/>
			<?php
			//Display an harcoded logout
			$task = JRequest::getCmd('task');
			if ($task == 'edit' || $task == 'editA' || JRequest::getInt('hidemainmenu')) {
				$logoutLink = '';
			} else {
				$logoutLink = JRoute::_('index.php?option=com_login&task=logout&'. JSession::getFormToken() .'=1');
			}
			$hideLinks	= JRequest::getBool('hidemainmenu');
			$output = array();
			// Print the Preview link to Main site.
			$output[] = '<span class="viewsite"><a href="'.JURI::root().'" target="_blank">'.JText::_('JGLOBAL_VIEW_SITE').'</a></span>';
		    // Print the Preview link to Position module site.
			$output[] = '<span class="viewsite"><a href="'.JURI::root().'?tp=1" target="_blank">'.JText::_('позиции').'</a></span>';
			// Print the logout link.
			$output[] = '<span class="logout">' .($hideLinks ? '' : '<a href="'.$logoutLink.'">').JText::_('JLOGOUT').($hideLinks ? '' : '</a>').'</span>';
			// Output the items.
			foreach ($output as $item) :
			echo $item;
			endforeach;
			?>
	</div>

	<!-- Content Area -->
	<div id="content">

		<!-- Component Title -->
		<jdoc:include type="modules" name="title" />

		<!-- System Messages -->
		<jdoc:include type="message" />
		<!-- Sub Menu Navigation -->
		<div id="no-submenu"></div>
   		<div class="clr"></div>

		<!-- Beginning of Actual Content -->
		<div id="element-box">
			<p id="skiptargetholder"><a id="skiptarget" class="skip" tabindex="-1"></a></p>

				<div class="adminform">

					<!-- Display the Quick Icon Shortcuts -->
					<div class="cpanel-icons">
						<?php if ($this->countModules('icon')>1):?>
							<?php echo JHtml::_('sliders.start', 'position-icon', array('useCookie' => 1));?>
							<jdoc:include type="modules" name="icon" style="sliders" />
							<?php echo JHtml::_('sliders.end');?>
						<?php else:?>
							<jdoc:include type="modules" name="icon" />
						<?php endif;?>
					</div>

					<!-- Display Admin Information Panels -->
					<div class="cpanel-component">
						<jdoc:include type="component" />
					</div>

				</div>
				<div class="clr"></div>

		</div><!-- end element-box -->

		<noscript>
			<?php echo  JText::_('JGLOBAL_WARNJAVASCRIPT') ?>
		</noscript>
		<div class="clr"></div>

	</div><!-- end content -->
		<div class="clr"></div>
	</div><!-- end containerwrap -->

	<!-- Footer -->
	<div id="footer">
		<jdoc:include type="modules" name="footer" style="none"  />
		<p class="copyright">
			<?php $joomla= '<a href="http://www.joomla.org">Joomla!&#174;</a>';
			echo JText::sprintf('JGLOBAL_ISFREESOFTWARE', $joomla) ?>
		</p>
	</div>
</body>
</html>
