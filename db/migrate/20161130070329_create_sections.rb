class CreateSections < ActiveRecord::Migration[5.0]
  def change
    create_table :sections do |t|
      t.string :title
      t.text :body
      t.integer :book_id

      t.timestamps
    end
    add_index :sections, :book_id
  end
end
