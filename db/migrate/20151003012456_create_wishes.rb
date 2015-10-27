class CreateWishes < ActiveRecord::Migration
  def change
    create_table :wishes do |t|
      t.string :text
      t.integer :votes

      t.timestamps null: false
    end
  end
end
