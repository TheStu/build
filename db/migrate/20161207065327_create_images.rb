class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.string :image
      t.integer :book_id

      t.timestamps
    end
    add_index :images, :book_id
  end
end
