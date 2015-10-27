class ChangeDefaultVoteValue < ActiveRecord::Migration
  def change
    change_column_default :wishes, :votes, 0
  end
end
