# name: discourse-pepplanner
# about: Adds Pepplanner Calendar and Calculator to the Discourse header
# version: 0.1
# authors: Pepplanner Team
# url: https://github.com/your-repo/discourse-pepplanner

enabled_site_setting :pepplanner_enabled

register_asset 'stylesheets/common/pepplanner.scss'

register_svg_icon "calculator" if respond_to?(:register_svg_icon)
register_svg_icon "calendar-alt" if respond_to?(:register_svg_icon)
