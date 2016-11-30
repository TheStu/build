class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :title
      t.text :content
      t.string :author
      t.integer :user_id

      t.timestamps
    end
    add_index :books, :user_id
  end
end
