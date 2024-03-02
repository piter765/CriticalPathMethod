class Activity {
  constructor(configs = {}) {
    const { name, duration, est, lst, eet, let: end, r, predecessor, successor } = configs;
    this.id = 0;
    this.name = name;
    this.duration = duration;
    this.est = est;
    this.lst = lst;
    this.eet = eet;
    this.let = end;
    this.r = r;
    this.successors = [successor];
    this.predecessors = [predecessor];
    
  }
}

class ActivityList {
  processed = false;
  list = {};
  start;
  end;

  addActivity(activity) {
    activity.id = this.id++;
    this.list[activity.name] = activity;
  }

  #processList() {
    if (this.processed) return;
    this.processed = true;

    for (const activity of list) {
      list.find(a => a.id = activity.nextActivity); 

    }
  }
}