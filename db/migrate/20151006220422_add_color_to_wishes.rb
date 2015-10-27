class AddColorToWishes < ActiveRecord::Migration
  def change
    add_column :wishes, :color, :string
  end
end
