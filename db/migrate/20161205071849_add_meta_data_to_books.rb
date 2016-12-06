class AddMetaDataToBooks < ActiveRecord::Migration[5.0]
  def change
    add_column :books, :publisher, :string
    add_column :books, :published_at, :date
    add_column :books, :description, :text
    add_column :books, :subject, :string
    add_column :books, :language, :string
  end
end
