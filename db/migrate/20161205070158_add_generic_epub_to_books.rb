class AddGenericEpubToBooks < ActiveRecord::Migration[5.0]
  def change
    add_column :books, :generic_epub, :string
  end
end
