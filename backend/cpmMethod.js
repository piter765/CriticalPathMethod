class Activity {
  constructor(configs = {}) {
    const { id, duration, est, lst, eet, let: end, h, predecessors = [] } = configs;
    this.id = id;
    this.duration = duration;
    this.est = est;
    this.lst = lst;
    this.eet = eet;
    this.let = end;
    this.h = h;
    this.successors = [];
    this.predecessors = predecessors;
  }
}

class ActivityList {
  #processed = false;
  #list = {};
  #start;
  #end;

  addActivity(activity) {
    this.#list[activity.id] = activity;
  }

  #processList() {
    if (this.#processed) return;
    this.#processed = true;

    this.#start = new Activity({ id: 'start', duration: 0 });

    for (const key in this.#list) {
      const current = this.#list[key];
      const predecessorsIds = current.predecessors;
      const predecessors = [];

      if (predecessorsIds.length === 0) {
        predecessors.push(this.#start);
        this.#start.successors.push(current);
      } else {
        for (const id of predecessorsIds) {
          const previous = this.#list[id];
          if (!previous) {
            throw new Error(`Node ${id} doesn't exist`);
          }
          predecessors.push(previous);
          previous.successors.push(current);
        }
      }
      current.predecessors = predecessors;
    }
  }

  #setEarlyTimes(root) {
    for (const node of root.successors) {
      const predecessors = node.predecessors;
      for (const activity of predecessors) {
        if (node.est == null || node.est < activity.eet) {
          node.est = activity.eet;
        }
      }
      node.eet = node.est + node.duration;
      this.#setEarlyTimes(node);
    }
  }

  #setLateTimes(root) {
    if (root.successors.length === 0) {
      root.let = root.eet;
      root.lst = root.let - root.duration;
      root.h = root.eet - root.let;
    } else {
      for (const node of root.successors) {
        this.#setLateTimes(node);
        if (root.let == null || root.let > node.lst) {
          root.let = node.lst;
        }
      }

      root.lst = root.let - root.duration;
      root.h = root.let - root.eet;
    }
  }

  #buildCriticalPath(root, path) {
    if (root.h === 0) {
      const predecessors = root.predecessors;
      for (const predecessor of predecessors) {
        if (predecessor.h === 0) {
          const clone = new Activity({ ...predecessor });
          if (predecessor !== this.#start) {
            path.predecessors.push(clone);
            this.#buildCriticalPath(predecessor, clone);
          }
        }
      }
    }
  }

  getCriticalPath(endId) {
    if (!endId) {
      throw new Error('End activity ID is required!');
    }
    this.#end = this.#list[endId];
    if (!this.#end) {
      throw new Error('Node end does not match');
    }

    this.#processList();

    this.#start.est = 0;
    this.#start.eet = 0;
    this.#setEarlyTimes(this.#start);

    this.#end.let = this.#end.eet;
    this.#end.lst = this.#end.let - this.#end.duration;
    this.#end.h = this.#end.eet - this.#end.let;
    this.#setLateTimes(this.#start);

    let path = null;
    if (this.#end.h === 0) {
      path = new Activity({ ...this.#end });
      this.#buildCriticalPath(this.#end, path);
    }
    return path;
  }

  getList() {
    this.#processList();
    return this.#list;
  }
}

// Example usage
const table = new ActivityList();
// table.addActivity(new Activity({ id: 'A', duration: 8 }));
// table.addActivity(new Activity({ id: 'B', duration: 3 }));
// table.addActivity(new Activity({ id: 'C', duration: 1, predecessors: ['A', 'B'] }));
// table.addActivity(new Activity({ id: 'D', duration: 6, predecessors: ['C', 'B'] }));
// table.addActivity(new Activity({ id: 'E', duration: 4, predecessors: ['D', 'C', 'F', 'G'] }));
// table.addActivity(new Activity({ id: 'F', duration: 18, predecessors: ['B'] }));
// table.addActivity(new Activity({ id: 'G', duration: 10, predecessors: ['A', 'C'] }));

//console.log('TABLE', table.getList());

//const path = table.getCriticalPath('E');
//console.log(path);

//Example #2
table.addActivity(new Activity({ id: 'A', duration: 5}));
table.addActivity(new Activity({ id: 'B', duration: 7}));
table.addActivity(new Activity({ id: 'C', duration: 6, predecessors: ['A'] }));
table.addActivity(new Activity({ id: 'D', duration: 8, predecessors: ['A'] }));
table.addActivity(new Activity({ id: 'E', duration: 3, predecessors: ['B'] }));
table.addActivity(new Activity({ id: 'F', duration: 4, predecessors: ['C'] }));
table.addActivity(new Activity({ id: 'G', duration: 2, predecessors: ['C'] }));
table.addActivity(new Activity({ id: 'H', duration: 5, predecessors: ['E', 'D', 'F'] }));

console.log('TABLE', table.getList());