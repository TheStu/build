class AddUuidToBooks < ActiveRecord::Migration[5.0]
  def change
    add_column :books, :uuid, :string
  end
end
