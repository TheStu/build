class AddOrderIndexToSections < ActiveRecord::Migration[5.0]
  def change
    add_column :sections, :order_index, :integer
  end
end
