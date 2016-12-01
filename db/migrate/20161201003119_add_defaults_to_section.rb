class AddDefaultsToSection < ActiveRecord::Migration[5.0]
  def change
  	change_column :sections, :title, :string, default: 'Untitled'
  	change_column :sections, :body, :text, default: 'body text goes here...'
  end
end