# name: discourse-pepplanner
# about: Adds Pepplanner Calendar and Calculator to the Discourse header
# version: 0.1
# authors: Pepplanner Team
# url: https://github.com/your-repo/discourse-pepplanner

enabled_site_setting :pepplanner_enabled

register_asset 'stylesheets/common/pepplanner.scss'

register_svg_icon "calculator" if respond_to?(:register_svg_icon)
register_svg_icon "calendar-alt" if respond_to?(:register_svg_icon)

after_initialize do
  # Register custom field for calculator settings
  User.register_custom_field_type 'pepplanner_calculator_settings', :json
  User.register_custom_field_type 'pepplanner_calendar_data', :json

  DiscoursePluginRegistry.serialized_current_user_fields << 'pepplanner_calculator_settings'
  DiscoursePluginRegistry.serialized_current_user_fields << 'pepplanner_calendar_data'

  add_to_serializer(:current_user, :pepplanner_calculator_settings) do
    object.custom_fields['pepplanner_calculator_settings']
  end

  add_to_serializer(:current_user, :pepplanner_calendar_data) do
    object.custom_fields['pepplanner_calendar_data']
  end
end
